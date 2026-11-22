import bpy
scene = bpy.context.scene
print("ENGINE:", scene.render.engine, "FRAMES:", scene.frame_start, "..", scene.frame_end)
print("CAMERAS:", [(o.name, tuple(round(x,3) for x in o.location), tuple(round(x,3) for x in o.rotation_euler)) for o in bpy.data.objects if o.type == 'CAMERA'])
print("LIGHTS:", [(o.name, o.data.type, o.data.energy) for o in bpy.data.objects if o.type == 'LIGHT'])
meshes = [o for o in bpy.data.objects if o.type == 'MESH']
print("MESH_COUNT:", len(meshes), "SAMPLE:", [o.name for o in meshes[:25]])
