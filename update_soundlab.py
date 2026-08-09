import re

file_path = '/home/hery/Documents/Repositories/portfolio-website/portfolio-web-main/src/components/SoundLab.svelte'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Import playMetronomeClick
content = re.sub(
    r"import \{ PAD_GRID, ROW_LABELS, CATEGORY_COLORS, KEY_TO_PAD, playSound, getAnalyser \} from '\$lib/soundEngine';",
    "import { PAD_GRID, ROW_LABELS, CATEGORY_COLORS, KEY_TO_PAD, playSound, getAnalyser, playMetronomeClick } from '$lib/soundEngine';",
    content
)

# 2. Add Looper State
state_str = """  let showKeyboardPrompt = $state(false);

  // ─── Looper State ───
  let tempo = $state(120);
  let isRecording = $state(false);
  let isPlaying = $state(false);
  let activeTrack = $state(0);
  
  type RecordedEvent = { padId: number; time: number };
  let tracks: RecordedEvent[][] = $state([[], [], []]);
  
  let recordStartTime = 0;
  let playStartTime = 0;
  let metronomeInterval: number | null = null;
  let playbackTimeouts: number[] = [];

  function startMetronome() {
    if (metronomeInterval) clearInterval(metronomeInterval);
    const msPerBeat = 60000 / tempo;
    playMetronomeClick();
    metronomeInterval = setInterval(() => {
      playMetronomeClick();
    }, msPerBeat) as any;
  }

  function stopMetronome() {
    if (metronomeInterval) {
      clearInterval(metronomeInterval);
      metronomeInterval = null;
    }
  }

  function toggleRecord(trackIndex: number) {
    if (isRecording && activeTrack === trackIndex) {
      isRecording = false;
      stopMetronome();
    } else {
      stopPlayback();
      isRecording = true;
      activeTrack = trackIndex;
      tracks[trackIndex] = [];
      recordStartTime = performance.now();
      startMetronome();
    }
  }

  function stopPlayback() {
    isPlaying = false;
    playbackTimeouts.forEach(clearTimeout);
    playbackTimeouts = [];
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlayback();
    } else {
      if (isRecording) {
        isRecording = false;
        stopMetronome();
      }
      isPlaying = true;
      playStartTime = performance.now();
      
      let hasEvents = false;
      tracks.forEach(track => {
        if (track.length > 0) hasEvents = true;
        track.forEach(event => {
          const t = setTimeout(() => {
            if (isPlaying) {
                playSound(event.padId);
                activePads[event.padId] = true;
                setTimeout(() => activePads[event.padId] = false, 200);
            }
          }, event.time);
          playbackTimeouts.push(t as any);
        });
      });
      
      const maxTime = Math.max(0, ...tracks.flatMap(t => t.map(e => e.time)));
      if (hasEvents && maxTime > 0) {
        const t = setTimeout(() => {
          isPlaying = false;
        }, maxTime + 500);
        playbackTimeouts.push(t as any);
      } else {
        isPlaying = false;
      }
    }
  }
  
  function handleTempoChange(e: Event) {
    const input = e.target as HTMLInputElement;
    tempo = parseInt(input.value);
    if (isRecording) {
      startMetronome();
    }
  }"""
content = re.sub(
    r"  let showKeyboardPrompt = \$state\(false\);",
    state_str,
    content
)

# 3. Add recording to handlePadPress
pad_str = """    setTimeout(() => {
      activePads[pad.id] = false;
    }, 200);

    if (isRecording) {
      tracks[activeTrack].push({
        padId: pad.id,
        time: performance.now() - recordStartTime
      });
    }"""
content = re.sub(
    r"    setTimeout\(\(\) => \{\n      activePads\[pad.id\] = false;\n    \}, 200\);",
    pad_str,
    content,
    count=1
)

# 4. Add recording to handleKeyDown
key_str = """      setTimeout(() => {
        activePads[padId] = false;
      }, 200);

      if (isRecording) {
        tracks[activeTrack].push({
          padId: padId,
          time: performance.now() - recordStartTime
        });
      }"""
content = re.sub(
    r"      setTimeout\(\(\) => \{\n        activePads\[padId\] = false;\n      \}, 200\);",
    key_str,
    content,
    count=1
)

# 5. Add Looper UI markup
ui_str = """    <!-- Music Links -->
    <div class="music-links">
      <button class="music-link" onclick={() => window.open('https://open.spotify.com/artist/5uzY3x7q567a2Fmg7fKbWh', '_blank')}>
        <Icon icon="mdi:spotify" width="20" />
        <span>Spotify</span>
      </button>
      <button class="music-link" onclick={() => window.open('https://youtube.com/channel/UCKsrfag-JNkGQ2YJmElAkQQ', '_blank')}>
        <Icon icon="mdi:youtube" width="20" />
        <span>YouTube</span>
      </button>
    </div>

    <!-- Looper UI -->
    {#if isExpanded}
      <div class="looper-ui" in:fly={{ y: 20, duration: 600, delay: 200 }}>
        <div class="looper-controls">
          <div class="tempo-control">
            <label for="tempo-slider">Tempo: {tempo} BPM</label>
            <input 
              id="tempo-slider" 
              type="range" 
              min="60" 
              max="140" 
              step="1" 
              bind:value={tempo} 
              oninput={handleTempoChange} 
            />
          </div>
          
          <div class="track-controls">
            {#each [0, 1, 2] as i}
              <button 
                class="track-btn" 
                class:recording={isRecording && activeTrack === i}
                class:has-data={tracks[i].length > 0}
                onclick={() => toggleRecord(i)}
              >
                <Icon icon="mdi:record-circle" width="16" /> Track {i + 1}
              </button>
            {/each}
          </div>
          
          <button 
            class="play-btn" 
            class:playing={isPlaying}
            onclick={togglePlay}
          >
            <Icon icon={isPlaying ? "mdi:stop" : "mdi:play"} width="24" /> 
            {isPlaying ? 'Stop' : 'Play All'}
          </button>
        </div>
      </div>
    {/if}
  </div>"""
content = re.sub(
    r"    <!-- Music Links -->\n    <div class=\"music-links\">\n.*?</button>\n    </div>\n  </div>",
    ui_str,
    content,
    flags=re.DOTALL
)

# 6. Add CSS
css_str = """  /* ─── Looper UI ─── */
  .looper-ui {
    background: rgba(4, 33, 37, 0.6);
    border: 1px solid rgba(218, 244, 210, 0.15);
    border-radius: 20px;
    padding: 20px 30px;
    margin-top: 10px;
    backdrop-filter: blur(10px);
    width: 100%;
    max-width: 740px;
  }
  
  .looper-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .tempo-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 150px;
  }
  
  .tempo-control label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgba(218, 244, 210, 0.8);
  }
  
  .tempo-control input[type="range"] {
    accent-color: #daf4d2;
    cursor: pointer;
    width: 100%;
  }
  
  .track-controls {
    display: flex;
    gap: 10px;
  }
  
  .track-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(218, 244, 210, 0.05);
    border: 1px solid rgba(218, 244, 210, 0.2);
    color: #daf4d2;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .track-btn:hover {
    background: rgba(218, 244, 210, 0.1);
  }
  
  .track-btn.recording {
    background: rgba(255, 80, 80, 0.2);
    border-color: rgba(255, 80, 80, 0.6);
    color: #ff9999;
    box-shadow: 0 0 15px rgba(255, 80, 80, 0.3);
    animation: pulse 1s infinite alternate;
  }
  
  .track-btn.has-data:not(.recording) {
    border-color: rgba(136, 192, 126, 0.6);
    background: rgba(136, 192, 126, 0.1);
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    100% { transform: scale(1.03); }
  }
  
  .play-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #daf4d2;
    color: #042125;
    border: none;
    padding: 8px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(218, 244, 210, 0.2);
  }
  
  .play-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(218, 244, 210, 0.3);
  }
  
  .play-btn.playing {
    background: #88c07e;
  }

  /* ─── Fact Bubbles ─── */"""
content = re.sub(
    r"  /\* ─── Fact Bubbles ─── \*/",
    css_str,
    content
)

with open(file_path, 'w') as f:
    f.write(content)
