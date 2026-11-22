import bpy
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

scene.cycles.samples = 80
scene.cycles.use_denoising = True
scene.render.resolution_x = 1600
scene.render.resolution_y = 1000
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'

# Use existing Camera orientation as ground truth (it faces +Y toward the front of the Evolver!)
orig_cam = bpy.data.objects.get('Camera')
# Pick the unit closest to origin at frame 1
bodies = [o for o in bpy.data.objects if o.name.startswith('Body_evolver')]
def bbox_center(obj):
    pts = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    return sum(pts, Vector()) / len(pts), pts

best_body = min(bodies, key=lambda o: (bbox_center(o)[0] - Vector((0, 0, -0.58))).length)
center, pts = bbox_center(best_body)
min_v = Vector((min(v.x for v in pts), min(v.y for v in pts), min(v.z for v in pts)))
max_v = Vector((max(v.x for v in pts), max(v.y for v in pts), max(v.z for v in pts)))
size = max_v - min_v
print("Chosen body:", best_body.name, "center:", center, "min:", min_v, "max:", max_v)

# Focus on the front face (min_v.y), slightly left of center around Drive & Low Cut
front_y = min_v.y
target = Vector((center.x - size.x * 0.08, front_y, center.z))

# Dramatic close 3/4 raking angle in front of the faceplate (-Y side), well inside any backdrop plane
cam_loc = Vector((center.x - size.x * 0.58, front_y - size.x * 0.42, center.z + size.z * 0.55))

cam_data = bpy.data.cameras.new("MacroShotCam")
cam_data.lens = 75.0
cam_data.dof.use_dof = True
cam_data.dof.focus_distance = (target - cam_loc).length
cam_data.dof.aperture_fstop = 4.0

cam_obj = bpy.data.objects.new("MacroShotCam", cam_data)
scene.collection.objects.link(cam_obj)
cam_obj.location = cam_loc
cam_obj.rotation_euler = (target - cam_loc).to_track_quat('-Z', 'Y').to_euler()
scene.camera = cam_obj

# Hide any background plane that might sit behind/around and darken world to matte studio black
for o in bpy.data.objects:
    if o.name.startswith('Piano') or o.name.startswith('Plane'):
        o.hide_render = True

if scene.world and scene.world.use_nodes:
    for node in scene.world.node_tree.nodes:
        if node.type == 'BACKGROUND':
            node.inputs[0].default_value = (0.008, 0.008, 0.010, 1.0)
            node.inputs[1].default_value = 0.2

scene.render.filepath = r"C:\Users\daniele\orage-evolver-site\scripts\render_macro.png"
bpy.ops.render.render(write_still=True)
print("RENDER_MACRO_OK")
