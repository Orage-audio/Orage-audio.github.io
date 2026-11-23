import bpy
import os

JOBS = [
    {
        "src": r"I:\Il mio Drive\Sito web- INSTAGRAM\VIDEO\animazioni blender\nuova evolver alluminio\solo vox senza sfondo_0003984-5090.mov",
        "audio_override": None,
        "speed": 1.0,
        "dst": r"C:\Users\daniele\orage-evolver-site\public\video\solo-vox.mp4",
    },
    {
        "src": r"I:\Il mio Drive\Sito web- INSTAGRAM\VIDEO\animazioni blender\nuova evolver alluminio\rock n roll vox no sfondo_0005641-6190.mov",
        "audio_override": r"C:\Users\daniele\orage-evolver-site\scripts\rnr_vox_slow.wav",
        "speed": 0.92,
        "dst": r"C:\Users\daniele\orage-evolver-site\public\video\rock-n-roll-vox.mp4",
    },
]

for job in JOBS:
    src = job["src"]
    dst = job["dst"]
    speed = job["speed"]
    audio_override = job["audio_override"]

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.sequence_editor_create()
    seq = scene.sequence_editor

    movie = seq.sequences.new_movie("Movie", src, channel=2, frame_start=1)
    orig_frames = movie.frame_final_duration
    out_frames = int(round(orig_frames / speed))

    if audio_override:
        seq.sequences.new_sound("Sound", audio_override, channel=1, frame_start=1)
    else:
        seq.sequences.new_sound("Sound", src, channel=1, frame_start=1)

    bg = seq.sequences.new_effect("BG", type='COLOR', channel=1, frame_start=1, frame_end=out_frames)
    bg.color = (0.0, 0.0, 0.0)

    movie.transform.offset_y = -20

    if abs(speed - 1.0) > 1e-4:
        # Stretch movie duration to match slowed 0.92x audio using Blender Speed Control strip
        movie.frame_final_end = out_frames + 1
        speed_strip = seq.sequences.new_effect(
            "SlowDown",
            type='SPEED',
            channel=3,
            frame_start=1,
            frame_end=out_frames + 1,
            seq1=movie,
        )
        speed_strip.speed_control = 'STRETCH'
        speed_strip.blend_type = 'ALPHA_OVER'
        movie.mute = True
    else:
        movie.blend_type = 'ALPHA_OVER'

    scene.render.resolution_x = 1080
    scene.render.resolution_y = 380
    scene.render.resolution_percentage = 100
    scene.render.fps = 30
    scene.frame_start = 1
    scene.frame_end = out_frames

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

    print(f"Encoding {os.path.basename(dst)} (speed={speed}, frames={out_frames})")
    bpy.ops.render.render(animation=True)
    size_mb = os.path.getsize(dst) / (1024 * 1024)
    print(f"DONE {os.path.basename(dst)} -> {size_mb:.2f} MB")
