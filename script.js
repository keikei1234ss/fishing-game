"use strict";

const affectionValue = document.getElementById("affectionValue");
const affectionBar = document.getElementById("affectionBar");
const dialogueText = document.getElementById("dialogueText");
const choicesEl = document.getElementById("choices");
const speakerEl = document.getElementById("speaker");
const chapterEl = document.getElementById("chapter");
const hintEl = document.getElementById("hint");
const restartButton = document.getElementById("restartButton");
const musicButton = document.getElementById("musicButton");
const voiceButton = document.getElementById("voiceButton");
const replayButton = document.getElementById("replayButton");

const story = [
  {
    speaker: "凛",
    chapter: "Scene 1 / 夜の合図",
    text: "では今から、少しだけ近くに参りますね。目を閉じて、私の声だけ聞いていてください。ふふっ、緊張しているご主人様も可愛いです。",
    choices: [
      { text: "声に身を任せる", score: 12, next: 1, hint: "凛は満足そうに距離を詰めました。" },
      { text: "少し照れる", score: 8, next: 1, hint: "初々しい反応に、凛の声が弾みました。" },
      { text: "余裕ぶってみる", score: 5, next: 1, hint: "凛は楽しそうに笑いました。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 2 / 甘い気配",
    text: "あら、もう表情がほどけてきましたね。ほら、もっと力を抜いてください。私がちゃんと、気持ちのいいところまで連れていきますから。",
    choices: [
      { text: "ゆっくりお願いする", score: 14, next: 2, hint: "凛は優しく頷きました。" },
      { text: "任せると伝える", score: 12, next: 2, hint: "信頼されて、凛は嬉しそうです。" },
      { text: "深呼吸する", score: 6, next: 2, hint: "凛はあなたのペースに合わせました。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 3 / ゆっくり味わう時間",
    text: "はいはい、焦らないでくださいご主人様。まずはゆっくり、今の温度を味わっていきましょうね。急がなくても、夜は逃げませんよ。",
    choices: [
      { text: "名前を呼んでもらう", score: 12, next: 3, hint: "凛の声がほんの少し甘くなりました。" },
      { text: "手を重ねる", score: 15, next: 3, hint: "静かな熱が二人の間に灯りました。" },
      { text: "冗談でごまかす", score: 3, next: 3, hint: "凛は笑いましたが、少し物足りなそうです。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 4 / 少し大胆に",
    text: "ごめんなさい、ご主人様。ちょっと嬉しくなって、張り切りすぎてしまいました。でも喜んでいただけたなら、私も幸せです。",
    choices: [
      { text: "ありがとうと伝える", score: 16, next: 4, hint: "凛の表情が柔らかくほどけました。" },
      { text: "凛の願いも聞く", score: 18, next: 4, hint: "対等に扱われて、凛はとても嬉しそうです。" },
      { text: "黙って見つめる", score: 7, next: 4, hint: "沈黙にも、少しだけ温度がありました。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 5 / 覚悟してくださいね",
    text: "ではここから一気に、甘やかしのご奉仕をしていきますよ。覚悟してくださいね、ご・主・人・さ・ま。",
    choices: [
      { text: "覚悟を決める", score: 16, next: 5, hint: "凛の瞳がきらりと輝きました。" },
      { text: "優しくしてと頼む", score: 18, next: 5, hint: "凛は声をやわらげました。" },
      { text: "凛を見つめる", score: 12, next: 5, hint: "視線だけで気持ちが伝わりました。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 6 / 高まる鼓動",
    text: "はぁ……すごい。ご主人様の鼓動、どんどん近くに感じます。私まで熱くなってしまいそうです。もう少しだけ、このままで。",
    choices: [
      { text: "そのまま寄り添う", score: 16, next: 6, hint: "凛は安心して身体を預けました。" },
      { text: "凛の頬に触れる", score: 18, next: 6, hint: "凛は目を細め、嬉しそうです。" },
      { text: "少しからかう", score: 8, next: 6, hint: "凛はむっとしつつも楽しそうです。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 7 / 溢れる想い",
    text: "あっ……もう、そんな顔をされたら我慢できなくなってしまいます。ご主人様の気持ち、ちゃんと全部受け止めますから。",
    choices: [
      { text: "信じて任せる", score: 18, next: 7, hint: "凛はまっすぐに頷きました。" },
      { text: "気持ちを伝える", score: 20, next: 7, hint: "凛は胸元に手を当て、深く息をしました。" },
      { text: "照れて黙る", score: 10, next: 7, hint: "凛は優しく待ってくれました。" },
    ],
  },
  {
    speaker: "凛",
    chapter: "Scene 8 / 秘密の暗転",
    text: "ここから先は、画面には映せない二人だけの時間です。明かりを落としますね。私の手を、最後まで離さないでください。",
    choices: [
      { text: "手を握り返す", score: 22, next: "ending", hint: "凛は小さく息をのみ、そっと寄り添いました。" },
      { text: "名前を囁く", score: 18, next: "ending", hint: "凛は幸せそうに返事をしました。" },
      { text: "無理はしないでと言う", score: 20, next: "ending", hint: "凛は深く安心し、さらに心を開きました。" },
    ],
  },
];

const endings = {
  best: {
    speaker: "凛",
    chapter: "Ending / 最高のご奉仕",
    text: "夜が明けるころ、凛は少し眠そうに笑いました。『こんなに大切にしてもらえるなんて、私、本当に幸せです。まだ夜は長いんですから、また何度でもお付き合いしますね。』\n\nHappy End: ふたりだけの合鍵",
  },
  good: {
    speaker: "凛",
    chapter: "Ending / 甘い余韻",
    text: "凛は乱れたリボンを直しながら、照れたように微笑みました。『今日はここまで。また続きを予約してくださいますか？』\n\nGood End: 次の夜の約束",
  },
  normal: {
    speaker: "凛",
    chapter: "Ending / やさしい閉店",
    text: "凛はいつものメイドらしい礼をして、あなたを見送りました。『急がなくていいんです。ご主人様の歩幅で、また会いに来てくださいね。』\n\nNormal End: 静かな帰り道",
  },
};

const state = {
  affection: 0,
  scene: 0,
  currentLine: "",
};

const voice = {
  enabled: true,
  selected: null,
  supported: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
};

const music = {
  context: null,
  master: null,
  timer: null,
  step: 0,
  isPlaying: false,
  chords: [
    ["F4", "A4", "C5"],
    ["G4", "B4", "D5"],
    ["E4", "G4", "C5"],
    ["A3", "E4", "C5"],
  ],
  melody: ["C5", "E5", "G5", "E5", "D5", "B4", "C5", "A4"],
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function renderScene() {
  const item = story[state.scene];
  speakerEl.textContent = item.speaker;
  chapterEl.textContent = item.chapter;
  dialogueText.textContent = item.text;
  state.currentLine = item.text;
  choicesEl.innerHTML = "";

  item.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => choose(choice));
    choicesEl.appendChild(button);
  });

  updateAffection();
  speakCurrentLine();
}

function choose(choice) {
  state.affection = clamp(state.affection + choice.score, 0, 100);
  hintEl.textContent = choice.hint;

  if (choice.next === "ending") {
    renderEnding();
    return;
  }

  state.scene = choice.next;
  renderScene();
}

function renderEnding() {
  const ending = state.affection >= 66
    ? endings.best
    : state.affection >= 38
      ? endings.good
      : endings.normal;

  speakerEl.textContent = ending.speaker;
  chapterEl.textContent = ending.chapter;
  dialogueText.textContent = ending.text;
  state.currentLine = ending.text;
  choicesEl.innerHTML = "";

  const restart = document.createElement("button");
  restart.type = "button";
  restart.textContent = "もう一度";
  restart.addEventListener("click", restartGame);
  choicesEl.appendChild(restart);

  hintEl.textContent = `最終親密度は ${state.affection} でした。`;
  updateAffection();
  speakCurrentLine();
}

function updateAffection() {
  affectionValue.textContent = state.affection;
  affectionBar.style.width = `${state.affection}%`;
}

function restartGame() {
  stopVoice();
  state.affection = 0;
  state.scene = 0;
  hintEl.textContent = "選択で凛との距離が変わります。";
  renderScene();
}

function loadVoice() {
  if (!voice.supported) {
    voiceButton.disabled = true;
    replayButton.disabled = true;
    hintEl.textContent = "このブラウザは音声読み上げに対応していません。";
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  voice.selected =
    voices.find((item) => item.lang === "ja-JP" && /female|haruka|nanami|kyoko/i.test(item.name)) ||
    voices.find((item) => item.lang === "ja-JP") ||
    voices.find((item) => item.lang.startsWith("ja")) ||
    null;
}

function cleanVoiceText(text) {
  return text
    .replace(/\n+/g, "。")
    .replace(/Happy End: .+|Good End: .+|Normal End: .+/g, "")
    .trim();
}

function stopVoice() {
  if (voice.supported) {
    window.speechSynthesis.cancel();
  }
}

function speakCurrentLine() {
  if (!voice.enabled || !voice.supported || !state.currentLine) return;

  loadVoice();
  stopVoice();

  const utterance = new SpeechSynthesisUtterance(cleanVoiceText(state.currentLine));
  utterance.lang = "ja-JP";
  utterance.pitch = 1.12;
  utterance.rate = 0.92;
  utterance.volume = 0.95;

  if (voice.selected) {
    utterance.voice = voice.selected;
  }

  window.speechSynthesis.speak(utterance);
}

function toggleVoice() {
  voice.enabled = !voice.enabled;
  voiceButton.setAttribute("aria-pressed", String(voice.enabled));
  voiceButton.textContent = voice.enabled ? "ボイス ON" : "ボイス";

  if (voice.enabled) {
    hintEl.textContent = "ボイスを再生しています。";
    speakCurrentLine();
  } else {
    stopVoice();
    hintEl.textContent = "ボイスを停止しました。";
  }
}

function noteToFrequency(note) {
  const match = note.match(/^([A-G]#?)(\d)$/);
  const semitones = {
    C: -9,
    "C#": -8,
    D: -7,
    "D#": -6,
    E: -5,
    F: -4,
    "F#": -3,
    G: -2,
    "G#": -1,
    A: 0,
    "A#": 1,
    B: 2,
  };
  const [, pitch, octave] = match;
  return 440 * Math.pow(2, (semitones[pitch] + (Number(octave) - 4) * 12) / 12);
}

function createMusicContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  music.context = new AudioContext();
  music.master = music.context.createGain();
  music.master.gain.value = 0.16;
  music.master.connect(music.context.destination);
}

function playTone(note, start, duration, type, volume) {
  const oscillator = music.context.createOscillator();
  const gain = music.context.createGain();

  oscillator.type = type;
  oscillator.frequency.value = noteToFrequency(note);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  oscillator.connect(gain);
  gain.connect(music.master);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.04);
}

function playMusicStep() {
  const now = music.context.currentTime;
  const chord = music.chords[Math.floor(music.step / 4) % music.chords.length];

  if (music.step % 4 === 0) {
    chord.forEach((note, index) => {
      playTone(note, now + index * 0.015, 1.6, "triangle", 0.038);
    });
  }

  playTone(music.melody[music.step % music.melody.length], now, 0.34, "sine", 0.068);
  music.step += 1;
}

async function toggleMusic() {
  if (!music.context) {
    createMusicContext();
  }

  if (music.context.state === "suspended") {
    await music.context.resume();
  }

  music.isPlaying = !music.isPlaying;
  musicButton.setAttribute("aria-pressed", String(music.isPlaying));
  musicButton.textContent = music.isPlaying ? "音楽 ON" : "音楽";

  if (music.isPlaying) {
    playMusicStep();
    music.timer = window.setInterval(playMusicStep, 420);
    hintEl.textContent = "BGMを再生しています。";
  } else {
    window.clearInterval(music.timer);
    music.timer = null;
    hintEl.textContent = "BGMを停止しました。";
  }
}

if (voice.supported) {
  window.speechSynthesis.addEventListener("voiceschanged", loadVoice);
  loadVoice();
}

restartButton.addEventListener("click", restartGame);
musicButton.addEventListener("click", toggleMusic);
voiceButton.addEventListener("click", toggleVoice);
replayButton.addEventListener("click", speakCurrentLine);
renderScene();
