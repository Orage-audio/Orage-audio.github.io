import bpy
import os

JOBS = [
    (
        r"I:\Il mio Drive\Sito web- INSTAGRAM\VIDEO\animazioni blender\nuova evolver alluminio\electronic bass no sfondo_0005091-5640.mov",
        r"C:\Users\daniele\orage-evolver-site\public\video\electronic-bass.mp4",
    ),
    (
        r"I:\Il mio Drive\Sito web- INSTAGRAM\VIDEO\animazioni blender\nuova evolver alluminio\solo synth senza sfondo_0002881-3984.mov",
        r"C:\Users\daniele\orage-evolver-site\public\video\solo-synth.mp4",
    ),
]

for src, dst in JOBS:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.sequence_editor_create()
    seq = scene.sequence_editor

    # Add movie + sound strips at frame 1
    movie = seq.sequences.new_movie("Movie", src, channel=2, frame_start=1)
    sound = seq.sequences.new_sound("Sound", src, channel=1, frame_start=1)

    # Pure black background underneath transparent RGBA
    bg = seq.sequences.new_effect("BG", type='COLOR', channel=1, frame_start=1, frame_end=movie.frame_final_duration)
    bg.color = (0.0, 0.0, 0.0)
    movie.blend_type = 'ALPHA_OVER'

    # Output size: crisp 1080x380 centered on the horizontal 1U unit
    scene.render.resolution_x = 1080
    scene.render.resolution_y = 380
    scene.render.resolution_percentage = 100
    scene.render.fps = 30
    scene.frame_start = 1
    scene.frame_end = movie.frame_final_duration

    # Shift movie slightly vertically so the 1U unit (which sat around y=465..845 in 1080x1350) sits dead center
    # Center of 1350 is 675; unit center is around 655 (from top) -> in Blender Y-up, shift down slightly (+20)
    movie.transform.offset_y = -20

    # H.264 MP4 + AAC 256kbps (universal Safari/iOS/Chrome/Firefox playback)
    scene.render.image_settings.file_format = 'FFMPEG'
    scene.render.ffmpeg.format = 'MPEG4'
    scene.render.ffmpeg.codec = 'H264'
    scene.render.ffmpeg.constant_rate_factor = 'MEDIUM'
    scene.render.ffmpeg.ffmpeg_preset = 'GOOD'
    scene.render.ffmpeg.audio_codec = 'AAC'
    scene.render.ffmpeg.audio_bitrate = 256
    scene.render.ffmpeg.audio_channels = 'STEREO'
    scene.render.ffmpeg.audio_mixrate = 48000
    scene.render.filepath = dst

    print("Encoding:", os.path.basename(dst), "frames:", scene.frame_end)
    bpy.ops.render.render(animation=True)
    size_mb = os.path.getsize(dst) / (1024 * 1024)
    print(f"DONE {os.path.basename(dst)} -> {size_mb:.2f} MB")
