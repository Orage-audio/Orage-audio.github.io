import bpy
import math
from mathutils import Vector

scene = bpy.context.scene
scene.frame_set(1)
bpy.context.view_layer.update()

scene.render.engine = 'CYCLES'
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'OPTIX'
    prefs.get_devices()
    for d in prefs.devices:
        if d.type != 'CPU':
            d.use = True
    scene.cycles.device = 'GPU'
except Exception:
    pass

scene.cycles.samples = 112
scene.cycles.use_denoising = True
scene.render.resolution_x = 1600
scene.render.resolution_y = 1000
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'

# Keep scene's original color management (just slight exposure refinement so hardware stays crisp & rich)
scene.view_settings.exposure = -0.35

# Inspect and reuse Daniele's authentic Orage orange material from Piano / Piano.001 if present
orig_orange_mat = None
for o in bpy.data.objects:
    if o.name.startswith('Piano') or o.name.startswith('Plane'):
        if o.data and len(o.data.materials) > 0 and o.data.materials[0] is not None:
            orig_orange_mat = o.data.materials[0]
            print("Found original backdrop material:", orig_orange_mat.name, "on", o.name)
        o.hide_render = True

# Tame scene area lights slightly for natural studio contrast on aluminum
for o in bpy.data.objects:
    if o.type == 'LIGHT' and o.data.type == 'AREA':
        o.data.energy *= 0.52

top_body = bpy.data.objects.get('Body_evolver.003')
pts = [top_body.matrix_world @ Vector(c) for c in top_body.bound_box]
min_v = Vector((min(v.x for v in pts), min(v.y for v in pts), min(v.z for v in pts)))
max_v = Vector((max(v.x for v in pts), max(v.y for v in pts), max(v.z for v in pts)))
center = (min_v + max_v) * 0.5
size = max_v - min_v

# True Orage warm golden-orange (matches #be7f14 / #cc8d20 in linear space: R=0.72, G=0.28, B=0.012)
def make_orage_mat(name, roughness, coat=0.0):
    if orig_orange_mat is not None:
        mat = orig_orange_mat.copy()
        mat.name = name
    else:
        mat = bpy.data.materials.new(name)
        mat.use_nodes = True
    bsdf = None
    for n in mat.node_tree.nodes:
        if n.type == 'BSDF_PRINCIPLED':
            bsdf = n
            break
    if bsdf:
        # Ensure authentic warm Orage golden-orange (never muddy brown)
        bsdf.inputs["Base Color"].default_value = (0.76, 0.29, 0.012, 1.0)
        bsdf.inputs["Roughness"].default_value = roughness
        if "Coat Weight" in bsdf.inputs:
            bsdf.inputs["Coat Weight"].default_value = coat
    return mat

orage_floor_mat = make_orage_mat("OrageStudioFloorExact", roughness=0.18, coat=0.45)
orage_wall_mat = make_orage_mat("OrageStudioWallExact", roughness=0.78, coat=0.0)

bpy.ops.mesh.primitive_plane_add(size=40.0, location=(center.x, center.y, min_v.z - 0.002))
floor_obj = bpy.context.active_object
floor_obj.data.materials.append(orage_floor_mat)

bpy.ops.mesh.primitive_plane_add(
    size=40.0,
    location=(center.x - 0.5, max_v.y + 3.2, center.z + 3.5),
    rotation=(math.radians(90), 0.0, math.radians(-16)),
)
wall_obj = bpy.context.active_object
wall_obj.data.materials.append(orage_wall_mat)

# Dedicated backdrop fill aimed strictly at the orange wall (creates the rich golden-orange gradient without overexposing aluminum)
bg_light_data = bpy.data.lights.new(name="BackdropGradientLight", type='AREA')
bg_light_data.energy = 680.0
bg_light_data.shape = 'RECTANGLE'
bg_light_data.size = 7.0
bg_light_data.size_y = 4.0
bg_light_data.color = (1.0, 0.95, 0.88)
bg_light = bpy.data.objects.new("BackdropGradientLight", bg_light_data)
scene.collection.objects.link(bg_light)
bg_light.location = Vector((center.x + 2.8, max_v.y + 0.6, center.z + 2.2))
bg_light.rotation_euler = (Vector((center.x + 1.0, max_v.y + 3.2, center.z + 0.8)) - bg_light.location).to_track_quat('-Z', 'Y').to_euler()

# Gentle front fill so the aluminum faceplate & knobs have realistic studio modeling
key_data = bpy.data.lights.new(name="FrontSoftbox", type='AREA')
key_data.energy = 140.0
key_data.shape = 'RECTANGLE'
key_data.size = 4.5
key_data.size_y = 2.0
key_data.color = (1.0, 0.97, 0.93)
key_obj = bpy.data.objects.new("FrontSoftbox", key_data)
scene.collection.objects.link(key_obj)
key_obj.location = Vector((center.x + size.x * 0.65, min_v.y - 3.6, center.z + 2.2))
key_obj.rotation_euler = (center - key_obj.location).to_track_quat('-Z', 'Y').to_euler()

target = Vector((center.x + size.x * 0.16, min_v.y, center.z - 0.02))
cam_loc = Vector((center.x + size.x * 0.72, min_v.y - size.x * 0.56, center.z + size.z * 0.68))

cam_data = bpy.data.cameras.new("OragePhotoCamExact")
cam_data.lens = 70.0
cam_data.dof.use_dof = True
cam_data.dof.focus_distance = (target - cam_loc).length
cam_data.dof.aperture_fstop = 4.5

cam_obj = bpy.data.objects.new("OragePhotoCamExact", cam_data)
scene.collection.objects.link(cam_obj)
cam_obj.location = cam_loc
cam_obj.rotation_euler = (target - cam_loc).to_track_quat('-Z', 'Y').to_euler()
scene.camera = cam_obj

scene.render.filepath = r"C:\Users\daniele\orage-evolver-site\scripts\render_orange_studio.png"
bpy.ops.render.render(write_still=True)
print("EXACT_ORAGE_RENDER_OK")
