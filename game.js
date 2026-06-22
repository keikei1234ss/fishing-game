"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const actionButton = document.getElementById("actionButton");
const soundToggle = document.getElementById("soundToggle");
const stateText = document.getElementById("stateText");
const tensionWrap = document.getElementById("tensionWrap");
const tensionFill = document.getElementById("tensionFill");
const tensionText = document.getElementById("tensionText");
const distanceText = document.getElementById("distanceText");
const fightReadout = document.getElementById("fightReadout");
const toast = document.getElementById("toast");
const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultFish = document.getElementById("resultFish");
const resultSize = document.getElementById("resultSize");
const resultCoin = document.getElementById("resultCoin");
const resultFishArt = document.getElementById("resultFishArt");
const resultOkButton = document.getElementById("resultOkButton");

const fishData = [
  { name: "イワシ", rate: 35, minSize: 8, maxSize: 18, minCoin: 10, maxCoin: 25, power: 0.6, biteFast: 0.8, catchComment: "小さくても元気な群れの魚！" },
  { name: "アジ", rate: 30, minSize: 12, maxSize: 28, minCoin: 20, maxCoin: 45, power: 1.0, catchComment: "港の定番、よく引いた！" },
  { name: "サバ", rate: 18, minSize: 20, maxSize: 38, minCoin: 35, maxCoin: 70, power: 1.3, catchComment: "横走りが鋭い一匹！" },
  { name: "メバル", rate: 12, minSize: 15, maxSize: 30, minCoin: 50, maxCoin: 90, power: 1.2, subtle: true, catchComment: "岩陰から出てきた良い魚！" },
  { name: "カサゴ", rate: 8, minSize: 14, maxSize: 28, minCoin: 55, maxCoin: 110, power: 1.15, bottom: true, catchComment: "底付近で食ってきた！" },
  { name: "黒鯛（チヌ）", rate: 5, minSize: 30, maxSize: 50, minCoin: 150, maxCoin: 300, power: 2.0, big: true, catchComment: "重量感のある大物！" },
  { name: "グレ（メジナ）", rate: 6, minSize: 18, maxSize: 42, minCoin: 80, maxCoin: 180, power: 1.55, catchComment: "堤防際でよく引いた！" },
  { name: "アイゴ", rate: 6, minSize: 18, maxSize: 35, minCoin: 70, maxCoin: 150, power: 1.35, catchComment: "力強い引きの磯魚！" },
  { name: "ベラ", rate: 10, minSize: 12, maxSize: 28, minCoin: 30, maxCoin: 75, power: 0.85, biteFast: 0.95, catchComment: "鮮やかな色の魚が来た！" },
  { name: "ボラ", rate: 5, minSize: 25, maxSize: 60, minCoin: 80, maxCoin: 200, power: 1.7, big: true, catchComment: "大きな魚影の正体！" },
  { name: "ウミタナゴ", rate: 10, minSize: 15, maxSize: 28, minCoin: 35, maxCoin: 85, power: 0.9, catchComment: "やさしい引きの港魚！" },
  { name: "フグ", rate: 9, minSize: 10, maxSize: 25, minCoin: 15, maxCoin: 45, power: 0.75, catchComment: "ぷっくりしたゲスト！" },
  { name: "ハゼ", rate: 11, minSize: 8, maxSize: 22, minCoin: 15, maxCoin: 40, power: 0.55, bottom: true, catchComment: "足元の底で食った！" },
  { name: "シロギス", rate: 9, minSize: 12, maxSize: 26, minCoin: 25, maxCoin: 65, power: 0.75, biteFast: 0.9, catchComment: "きれいな砂地の魚！" },
  { name: "チャリコ", rate: 7, minSize: 12, maxSize: 28, minCoin: 35, maxCoin: 90, power: 1.0, catchComment: "小さな真鯛の仲間！" },
  { name: "クロソイ", rate: 4, minSize: 18, maxSize: 36, minCoin: 90, maxCoin: 190, power: 1.45, bottom: true, subtle: true, catchComment: "根回りから重い引き！" },
  { name: "セイゴ", rate: 5, minSize: 25, maxSize: 45, minCoin: 100, maxCoin: 210, power: 1.55, catchComment: "銀色の魚体が走った！" },
  { name: "カワハギ", rate: 6, minSize: 12, maxSize: 28, minCoin: 55, maxCoin: 130, power: 0.95, subtle: true, catchComment: "エサ取り名人を釣り上げた！" },
  { name: "コノシロ", rate: 7, minSize: 18, maxSize: 32, minCoin: 35, maxCoin: 80, power: 0.9, catchComment: "きらっと光る群れの魚！" },
  { name: "キュウセン", rate: 7, minSize: 12, maxSize: 28, minCoin: 35, maxCoin: 80, power: 0.85, catchComment: "鮮やかな根回りの魚！" },
  { name: "アナハゼ", rate: 6, minSize: 10, maxSize: 24, minCoin: 25, maxCoin: 70, power: 0.8, bottom: true, catchComment: "岩陰から飛び出した！" },
];

const fishAssetPaths = {
  イワシ: "assets/fish/iwashi.png",
  アジ: "assets/fish/aji.png",
  サバ: "assets/fish/saba.png",
  メバル: "assets/fish/mebaru.png",
  カサゴ: "assets/fish/kasago.png",
  "黒鯛（チヌ）": "assets/fish/chinu.png",
  "グレ（メジナ）": "assets/fish/gure.png",
  アイゴ: "assets/fish/aigo.png",
  ベラ: "assets/fish/bera.png",
  ボラ: "assets/fish/bora.png",
  ウミタナゴ: "assets/fish/umitanago.png",
  フグ: "assets/fish/fugu.png",
  ハゼ: "assets/fish/haze.png",
  シロギス: "assets/fish/shirogisu.png",
  チャリコ: "assets/fish/chariko.png",
  クロソイ: "assets/fish/kurosoi.png",
  セイゴ: "assets/fish/seigo.png",
  カワハギ: "assets/fish/kawahagi.png",
  コノシロ: "assets/fish/konoshiro.png",
  キュウセン: "assets/fish/kyusen.png",
  アナハゼ: "assets/fish/anahaze.png",
};

const defaultFightBehavior = {
  preferredEscapeModes: ["run_side", "dash_nearby"],
  burstPower: 1,
  swimSpeed: 1,
  staminaDrainRate: 1,
  recoveryRate: 1,
  directionChangeRate: 0.24,
  chargePlayerChance: 0.08,
  structureEscapeChance: 0.04,
};

const fightBehaviorByFish = {
  イワシ: { preferredEscapeModes: ["dash_nearby", "run_side"], burstPower: 0.62, swimSpeed: 0.82, staminaDrainRate: 1.55, recoveryRate: 1.35, directionChangeRate: 0.42, chargePlayerChance: 0.06, structureEscapeChance: 0.01 },
  アジ: { preferredEscapeModes: ["run_side", "dash_nearby"], burstPower: 0.92, swimSpeed: 1.0, staminaDrainRate: 1.05, recoveryRate: 1.08, directionChangeRate: 0.34, chargePlayerChance: 0.08, structureEscapeChance: 0.03 },
  サバ: { preferredEscapeModes: ["run_side", "run_offshore", "run_side"], burstPower: 1.35, swimSpeed: 1.35, staminaDrainRate: 0.95, recoveryRate: 0.9, directionChangeRate: 0.38, chargePlayerChance: 0.1, structureEscapeChance: 0.03 },
  メバル: { preferredEscapeModes: ["hide_structure", "dive_bottom", "run_side"], burstPower: 0.95, swimSpeed: 0.82, staminaDrainRate: 0.9, recoveryRate: 0.92, directionChangeRate: 0.22, chargePlayerChance: 0.04, structureEscapeChance: 0.28 },
  カサゴ: { preferredEscapeModes: ["dive_bottom", "hide_structure", "dash_nearby"], burstPower: 0.88, swimSpeed: 0.62, staminaDrainRate: 0.9, recoveryRate: 0.85, directionChangeRate: 0.18, chargePlayerChance: 0.02, structureEscapeChance: 0.36 },
  "黒鯛（チヌ）": { preferredEscapeModes: ["run_offshore", "run_side", "charge_player", "dive_bottom"], burstPower: 1.55, swimSpeed: 1.05, staminaDrainRate: 0.72, recoveryRate: 0.75, directionChangeRate: 0.2, chargePlayerChance: 0.16, structureEscapeChance: 0.18 },
  "グレ（メジナ）": { preferredEscapeModes: ["run_side", "hide_structure", "run_offshore"], burstPower: 1.3, swimSpeed: 1.18, staminaDrainRate: 0.82, recoveryRate: 0.82, directionChangeRate: 0.34, chargePlayerChance: 0.08, structureEscapeChance: 0.3 },
  アイゴ: { preferredEscapeModes: ["run_side", "run_side", "charge_player"], burstPower: 1.18, swimSpeed: 1.2, staminaDrainRate: 0.9, recoveryRate: 0.88, directionChangeRate: 0.46, chargePlayerChance: 0.14, structureEscapeChance: 0.08 },
  ベラ: { preferredEscapeModes: ["dash_nearby", "run_side"], burstPower: 0.78, swimSpeed: 1.05, staminaDrainRate: 1.22, recoveryRate: 1.18, directionChangeRate: 0.5, chargePlayerChance: 0.08, structureEscapeChance: 0.08 },
  ボラ: { preferredEscapeModes: ["run_offshore", "run_offshore", "run_side"], burstPower: 1.48, swimSpeed: 1.0, staminaDrainRate: 0.62, recoveryRate: 0.68, directionChangeRate: 0.16, chargePlayerChance: 0.08, structureEscapeChance: 0.04 },
  ウミタナゴ: { preferredEscapeModes: ["run_side", "dash_nearby"], burstPower: 0.84, swimSpeed: 0.92, staminaDrainRate: 1.08, recoveryRate: 1.1, directionChangeRate: 0.32, chargePlayerChance: 0.08, structureEscapeChance: 0.08 },
  フグ: { preferredEscapeModes: ["dash_nearby", "dash_nearby"], burstPower: 0.56, swimSpeed: 0.68, staminaDrainRate: 1.25, recoveryRate: 1.2, directionChangeRate: 0.46, chargePlayerChance: 0.02, structureEscapeChance: 0.02 },
  ハゼ: { preferredEscapeModes: ["dive_bottom", "dash_nearby"], burstPower: 0.48, swimSpeed: 0.54, staminaDrainRate: 1.32, recoveryRate: 1.22, directionChangeRate: 0.18, chargePlayerChance: 0.01, structureEscapeChance: 0.18 },
  シロギス: { preferredEscapeModes: ["run_side", "dash_nearby"], burstPower: 0.72, swimSpeed: 1.05, staminaDrainRate: 1.28, recoveryRate: 1.2, directionChangeRate: 0.35, chargePlayerChance: 0.06, structureEscapeChance: 0.02 },
  チャリコ: { preferredEscapeModes: ["run_side", "dive_bottom"], burstPower: 0.92, swimSpeed: 0.92, staminaDrainRate: 1.0, recoveryRate: 1.0, directionChangeRate: 0.26, chargePlayerChance: 0.08, structureEscapeChance: 0.1 },
  クロソイ: { preferredEscapeModes: ["hide_structure", "dive_bottom", "hide_structure"], burstPower: 1.08, swimSpeed: 0.72, staminaDrainRate: 0.78, recoveryRate: 0.78, directionChangeRate: 0.16, chargePlayerChance: 0.02, structureEscapeChance: 0.42 },
  セイゴ: { preferredEscapeModes: ["run_side", "run_offshore", "charge_player"], burstPower: 1.28, swimSpeed: 1.28, staminaDrainRate: 0.88, recoveryRate: 0.86, directionChangeRate: 0.36, chargePlayerChance: 0.16, structureEscapeChance: 0.04 },
  カワハギ: { preferredEscapeModes: ["dash_nearby", "dive_bottom"], burstPower: 0.72, swimSpeed: 0.72, staminaDrainRate: 1.08, recoveryRate: 1.05, directionChangeRate: 0.44, chargePlayerChance: 0.03, structureEscapeChance: 0.14 },
  コノシロ: { preferredEscapeModes: ["run_side", "run_side", "dash_nearby"], burstPower: 0.9, swimSpeed: 1.18, staminaDrainRate: 1.12, recoveryRate: 1.08, directionChangeRate: 0.38, chargePlayerChance: 0.06, structureEscapeChance: 0.02 },
  キュウセン: { preferredEscapeModes: ["dash_nearby", "run_side", "charge_player"], burstPower: 0.78, swimSpeed: 1.05, staminaDrainRate: 1.16, recoveryRate: 1.15, directionChangeRate: 0.52, chargePlayerChance: 0.1, structureEscapeChance: 0.12 },
  アナハゼ: { preferredEscapeModes: ["dive_bottom", "hide_structure", "dash_nearby"], burstPower: 0.68, swimSpeed: 0.62, staminaDrainRate: 1.18, recoveryRate: 1.05, directionChangeRate: 0.22, chargePlayerChance: 0.02, structureEscapeChance: 0.26 },
};

fishData.forEach((fish) => {
  fish.imagePath = fishAssetPaths[fish.name] || "";
  fish.fightBehavior = { ...defaultFightBehavior, ...(fightBehaviorByFish[fish.name] || {}) };
});

const fishArtImages = {};
const waveVolume = 0.13;
const reelLightVolume = 0.28;
const reelTensionVolume = 0.36;
const dragVolume = 0.42;
const waveAudio = new Audio("assets/audio/nami.wav");
waveAudio.loop = true;
waveAudio.volume = waveVolume;
waveAudio.preload = "auto";
const reelLightAudio = new Audio("assets/audio/reel_light.wav.wav");
reelLightAudio.loop = true;
reelLightAudio.volume = reelLightVolume;
reelLightAudio.preload = "auto";
const reelTensionAudio = new Audio("assets/audio/reel_tension.wav");
reelTensionAudio.loop = true;
reelTensionAudio.volume = reelTensionVolume;
reelTensionAudio.preload = "auto";
const dragAudio = new Audio("assets/audio/drag.wav");
dragAudio.loop = true;
dragAudio.volume = dragVolume;
dragAudio.preload = "auto";
const backgroundImage = new Image();
backgroundImage.src = "assets/background/harbor-water.png";
const distantBoatImage = new Image();
distantBoatImage.src = "assets/background/distant-boat.png";
const distantBoatInitialSpawnMinMs = 30000;
const distantBoatInitialSpawnMaxMs = 60000;
const distantBoatSpawnMinMs = 150000;
const distantBoatSpawnMaxMs = 240000;
const waterReflectionImage = new Image();
waterReflectionImage.src = "assets/water/surface_reflections.png";
const waterCausticsImage = new Image();
waterCausticsImage.src = "assets/water/underwater_caustics.png";
const rippleImage = new Image();
rippleImage.src = "assets/water/ripple_ring.png";
const seawallFloorImage = new Image();
seawallFloorImage.src = "assets/foreground/seawall-floor.png";
const funamushiImage = new Image();
funamushiImage.src = "assets/foreground/funamushi.png";
const FISH_SHADOW_FORWARD_ANGLE = -2.32;
const fishShadowImage = new Image();
fishShadowImage.src = "data:image/png;base64,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";
const bobberImage = new Image();
bobberImage.src = "data:image/png;base64,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";
const rodImage = new Image();
rodImage.src = "data:image/png;base64,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";

const fishingAreas = {
  openWater: {
    name: "沖の開けた水面",
    snagRisk: 0.00001,
    weights: { イワシ: 1.35, アジ: 1.18, サバ: 1.25, メバル: 0.55, カサゴ: 0.12, "黒鯛（チヌ）": 0.75 },
  },
  seawall: {
    name: "岸壁際",
    snagRisk: 0.000035,
    weights: { イワシ: 0.45, アジ: 0.8, サバ: 0.72, メバル: 1.45, カサゴ: 0.55, "黒鯛（チヌ）": 2.25 },
  },
  tetrapod: {
    name: "テトラ帯",
    snagRisk: 0.00011,
    weights: { イワシ: 0.22, アジ: 0.5, サバ: 0.78, メバル: 1.45, カサゴ: 1.65, "黒鯛（チヌ）": 2.05 },
  },
};

const stateLabels = {
  idle: "待機中",
  casting: "投げた！",
  waiting: "アタリ待ち",
  nibbling: "アタリあり",
  bite: "沈んだ！",
  hooked: "HIT中",
  reeling: "釣り上げ中",
  retrieving: "回収中",
  caught: "釣れた",
  escaped: "逃げた",
};

const game = {
  state: "idle",
  coins: 0,
  ajiCaught: 0,
  caughtFishList: [],
  fishCatchCounts: Object.fromEntries(fishData.map((fish) => [fish.name, 0])),
  catchAnimation: null,
  castAnimation: null,
  splashTimer: 0,
  splashPoint: null,
  currentFish: null,
  fishSize: 0,
  fishCoin: 0,
  fishDistance: 0,
  initialFishDistance: 10,
  fishPower: 1,
  fishEnergy: 100,
  hookedFish: null,
  highTensionTimer: 0,
  lowTensionTimer: 0,
  staminaDrainRate: 0,
  reelDrainBonus: 0,
  fishPullForce: 0,
  reelLoad: 0,
  tensionRecovery: 0,
  fishEscapeForce: 0,
  reelSpeed: 0,
  surgeTimer: 0,
  surgeDuration: 0,
  nextSurgeAt: 0,
  surgePower: 0,
  tension: 0,
  isReeling: false,
  isRetrieving: false,
  selectedCastPoint: null,
  castPoint: null,
  currentArea: null,
  snagTimer: 0,
  nextSnagCheckAt: 0,
  targetShadow: null,
  hasBiteChance: false,
  nextNibbleAt: 0,
  nibbleStartAt: 0,
  nibblePecks: 0,
  biteAt: 0,
  biteEndsAt: 0,
  biteStartedAt: 0,
  bobberPattern: null,
  bobberPatternStartedAt: 0,
  fishX: 0.54,
  fishY: 0.7,
  fishDir: 1,
  fishShadows: [],
  fishSchools: [],
  distantBoats: [],
  nextDistantBoatAt: 0,
  hasSpawnedDistantBoat: false,
  funamushiList: [],
  nextFunamushiAt: 0,
  messageTimer: 0,
  logMessage: "",
  logTimer: 0,
  lastLogMessage: "",
  lastLogAt: 0,
  waveSoundEnabled: true,
  waveAudioStarted: false,
  reelLightStarted: false,
  reelTensionStarted: false,
  dragStarted: false,
  lastTime: performance.now(),
};

let resizeObserver;
let suppressNextActionClick = false;
const majorToastMessages = new Set(["HIT！", "大物HIT！", "根魚HIT！", "テトラ際でHIT！", "釣れた！", "根がかり！", "糸が切れた！", "逃げられた！"]);

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

function shadowBaseSizeFromCm(sizeCm) {
  return clamp(34 + sizeCm * 2.35, 46, 154);
}

function randomShadowVisualSize(sizeClass) {
  if (sizeClass === "small") return rand(8, 18);
  if (sizeClass === "large") return rand(32, 50);
  return rand(18, 32);
}

function setShadowVisualSize(shadow, sizeCm) {
  shadow.visualSizeCm = Number(sizeCm.toFixed(1));
  shadow.baseSize = shadowBaseSizeFromCm(shadow.visualSizeCm);
  shadow.width = shadow.baseSize;
  shadow.height = shadow.baseSize * 0.46;
}

function chooseFish() {
  const total = fishData.reduce((sum, fish) => sum + fish.rate, 0);
  let roll = Math.random() * total;

  for (const fish of fishData) {
    roll -= fish.rate;
    if (roll <= 0) return fish;
  }

  return fishData[0];
}

function chooseFishForShadow(shadow) {
  if (!shadow) return chooseFish();
  if (shadow.schoolType === "iwashi") return fishData[0];

  const area = fishingAreas[game.currentArea] || fishingAreas.openWater;
  const pool = fishData;
  const total = pool.reduce((sum, fish) => sum + fish.rate * (area.weights[fish.name] || 1) * shadowSizeFishWeight(shadow, fish), 0);
  let roll = Math.random() * total;

  for (const fish of pool) {
    roll -= fish.rate * (area.weights[fish.name] || 1) * shadowSizeFishWeight(shadow, fish);
    if (roll <= 0) return fish;
  }

  return pool[0];
}

function shadowSizeFishWeight(shadow, fish) {
  const visualSize = shadow?.visualSizeCm ?? (fish.minSize + fish.maxSize) / 2;
  const center = (fish.minSize + fish.maxSize) / 2;
  const halfRange = Math.max(2, (fish.maxSize - fish.minSize) / 2);
  const distanceFromRange = visualSize < fish.minSize
    ? fish.minSize - visualSize
    : visualSize > fish.maxSize
      ? visualSize - fish.maxSize
      : 0;
  const centerFit = clamp(1 - Math.abs(visualSize - center) / (halfRange + 6), 0.2, 1.15);
  const rangeFit = distanceFromRange === 0 ? 1 : Math.max(0.025, 1 - distanceFromRange / 14);
  const trophyBonus = visualSize >= 34 && fish.maxSize >= 35 ? 1.35 : 1;
  const tinyPenalty = visualSize < 18 && fish.big ? 0.04 : 1;
  return centerFit * rangeFit * trophyBonus * tinyPenalty;
}

function sizeAdjustedRange(fish, shadow) {
  if (!shadow) return [fish.minSize, fish.maxSize];
  const visualSize = shadow.visualSizeCm ?? (fish.minSize + fish.maxSize) / 2;
  const margin = Math.max(1.2, (fish.maxSize - fish.minSize) * 0.08);
  const min = clamp(visualSize - margin, fish.minSize, fish.maxSize);
  const max = clamp(visualSize + margin, fish.minSize, fish.maxSize);
  if (min > max) return [max, min];
  return [min, max];
}

function coinAdjustedRange(fish, shadow) {
  const span = fish.maxCoin - fish.minCoin;
  if (!shadow) return [fish.minCoin, fish.maxCoin];
  if (shadow.size === "small") return [fish.minCoin, Math.round(fish.minCoin + span * 0.38)];
  if (shadow.size === "large") {
    return [Math.round(fish.minCoin + span * 0.68), fish.maxCoin];
  }
  return [Math.round(fish.minCoin + span * 0.28), Math.round(fish.minCoin + span * 0.74)];
}

function waterTop(height) {
  return height * 0.3;
}

function isWaterArea(x, y) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  return x >= 0 && x <= w && y >= waterTop(h) + 18 && y <= h * 0.82;
}

function getFishingArea(point) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const nearShore = point.y > h * 0.68;
  const nearTetrapod = point.x < w * 0.32 && point.y > h * 0.46;

  if (nearTetrapod) return "tetrapod";
  if (nearShore || point.x > w * 0.72) return "seawall";
  return "openWater";
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function createFishShadows() {
  const iwashiSchool = createIwashiSchool(0.2, 0.66);
  game.fishSchools = [iwashiSchool];
  game.fishShadows = [
    ...iwashiSchool.members,
    createFishShadow("small", 0.62, 0.58),
    createFishShadow("small", 0.82, 0.74),
    createFishShadow("medium", 0.42, 0.62),
    createFishShadow("medium", 0.74, 0.48),
    createFishShadow("large", 0.3, 0.43),
    createFishShadow("large", 0.58, 0.38),
  ];
}

function createIwashiSchool(x, y) {
  const school = {
    x,
    y,
    vx: rand(0.000045, 0.000075),
    vy: rand(-0.000018, 0.000018),
    speed: rand(0.000052, 0.000078),
    yMin: 0.5,
    yMax: 0.78,
    nextTurnAt: performance.now() + rand(1800, 3600),
    members: [],
  };

  for (let i = 0; i < 10; i += 1) {
    const member = createFishShadow("small", x + rand(-0.055, 0.055), y + rand(-0.032, 0.032));
    setShadowVisualSize(member, rand(8.5, 13.5));
    member.school = school;
    member.schoolType = "iwashi";
    member.schoolOffsetX = rand(-0.07, 0.07);
    member.schoolOffsetY = rand(-0.04, 0.04);
    member.schoolPhase = rand(0, Math.PI * 2);
    member.scale = rand(0.72, 0.9);
    member.opacity = rand(0.22, 0.36);
    member.interest = rand(0.66, 0.96);
    member.speed = school.speed * rand(0.85, 1.18);
    school.members.push(member);
  }

  return school;
}

function createFishShadow(size, x, y) {
  const settings = {
    small: {
      speed: rand(0.000045, 0.000075),
      yMin: 0.46,
      yMax: 0.78,
    },
    medium: {
      speed: rand(0.000035, 0.00006),
      yMin: 0.45,
      yMax: 0.68,
    },
    large: {
      speed: rand(0.000025, 0.000048),
      yMin: 0.36,
      yMax: 0.58,
    },
  }[size];
  const visualSizeCm = randomShadowVisualSize(size);
  const baseSize = shadowBaseSizeFromCm(visualSizeCm);
  const vx = rand(-settings.speed, settings.speed) || settings.speed;
  const vy = rand(-settings.speed * 0.55, settings.speed * 0.55);

  return {
    x,
    y,
    homeX: x,
    homeY: y,
    size,
    visualSizeCm,
    baseSize,
    scale: 1,
    opacity: rand(0.32, 0.5),
    width: baseSize,
    height: baseSize * 0.46,
    speed: settings.speed,
    direction: vx >= 0 ? 1 : -1,
    vx,
    vy,
    angle: Math.atan2(vy, vx) + rand(-0.08, 0.08),
    angleOffset: rand(-0.1, 0.1),
    aspectJitter: rand(0.92, 1.08),
    yMin: settings.yMin,
    yMax: settings.yMax,
    interest: rand(0.45, 0.92) + (size === "large" ? -0.08 : size === "small" ? 0.06 : 0),
    nextDecisionAt: 0,
    curiousUntil: 0,
    phase: rand(0, Math.PI * 2),
  };
}

function setState(nextState) {
  game.state = nextState;
  stateText.textContent = stateLabels[nextState];
  updateButton();
  updateHud();
}

function updateButton() {
  const labels = {
    idle: "投げる",
    casting: "投げる",
    waiting: "リール",
    nibbling: "アワセる",
    bite: "アワセる",
    hooked: "リール",
    reeling: "リール",
    retrieving: "リール",
    caught: "もう一度",
    escaped: "もう一度",
  };

  actionButton.textContent = labels[game.state] || "投げる";
  actionButton.disabled = game.state === "casting";
}

function showToast(message, options = {}) {
  if (!options.major && !majorToastMessages.has(message)) {
    showLog(message, options);
    return;
  }

  toast.textContent = message;
  toast.classList.toggle("big", Boolean(options.big));
  toast.classList.add("show");
  game.messageTimer = options.duration || 1450;
}

function showLog(message, options = {}) {
  const now = performance.now();
  const cooldown = options.cooldown || 1300;
  if (message === game.lastLogMessage && now - game.lastLogAt < cooldown) return;

  game.logMessage = message;
  game.logTimer = options.duration || 1800;
  game.lastLogMessage = message;
  game.lastLogAt = now;
}

function hideToast() {
  toast.classList.remove("show", "big");
}

function updateSoundToggle() {
  if (!soundToggle) return;
  soundToggle.textContent = game.waveSoundEnabled ? "音 ON" : "音 OFF";
  soundToggle.setAttribute("aria-pressed", String(game.waveSoundEnabled));
}

function fadeOutAudio(audio, flagName, duration = 160) {
  if (audio.paused && !game[flagName]) return;
  clearInterval(audio._fadeTimer);
  const startVolume = audio.volume;
  const startedAt = performance.now();
  audio._fadeTimer = setInterval(() => {
    const t = clamp((performance.now() - startedAt) / duration, 0, 1);
    audio.volume = startVolume * (1 - t);
    if (t >= 1) {
      clearInterval(audio._fadeTimer);
      audio.pause();
      audio.currentTime = 0;
      game[flagName] = false;
    }
  }, 30);
}

function startLoopAudio(audio, volume, flagName) {
  if (!game.waveSoundEnabled || game[flagName]) return;
  clearInterval(audio._fadeTimer);
  game[flagName] = true;
  audio.volume = volume;
  audio.muted = false;
  audio.play().catch(() => {
    game[flagName] = false;
  });
}

function startWaveAudio() {
  startLoopAudio(waveAudio, waveVolume, "waveAudioStarted");
}

function startReelLightSound() {
  fadeOutAudio(reelTensionAudio, "reelTensionStarted", 90);
  startLoopAudio(reelLightAudio, reelLightVolume, "reelLightStarted");
}

function startReelTensionSound() {
  if (game.dragStarted) {
    fadeOutAudio(reelTensionAudio, "reelTensionStarted", 90);
    return;
  }
  fadeOutAudio(reelLightAudio, "reelLightStarted", 90);
  startLoopAudio(reelTensionAudio, reelTensionVolume, "reelTensionStarted");
}

function stopReelSounds() {
  fadeOutAudio(reelLightAudio, "reelLightStarted");
  fadeOutAudio(reelTensionAudio, "reelTensionStarted");
}

function startDragSound() {
  fadeOutAudio(reelTensionAudio, "reelTensionStarted", 90);
  startLoopAudio(dragAudio, dragVolume, "dragStarted");
}

function stopDragSound() {
  fadeOutAudio(dragAudio, "dragStarted", 140);
  if (game.isReeling && (game.state === "hooked" || game.state === "reeling")) {
    startLoopAudio(reelTensionAudio, reelTensionVolume, "reelTensionStarted");
  }
}

function stopAllEffectSounds() {
  stopReelSounds();
  stopDragSound();
}

function setWaveSoundEnabled(enabled) {
  game.waveSoundEnabled = enabled;
  if (enabled) {
    waveAudio.muted = false;
    updateSoundToggle();
    startWaveAudio();
    return;
  }

  waveAudio.pause();
  waveAudio.currentTime = 0;
  waveAudio.muted = true;
  game.waveAudioStarted = false;
  stopAllEffectSounds();
  updateSoundToggle();
}

function selectCastPoint(point) {
  if (game.state !== "idle") return;
  if (!isWaterArea(point.x, point.y)) return;

  game.selectedCastPoint = {
    x: point.x,
    y: point.y,
  };
  const target = findTargetShadow(point);
  showToast(target ? `${shadowLabel(target)}を狙います` : "魚影の近くを狙うと釣れやすい", { duration: 1100 });
}

function startCast() {
  if (!game.selectedCastPoint) {
    showToast("水面をタップして投げる場所を選んでください", { duration: 1800 });
    return;
  }

  resultCard.hidden = true;
  resultCard.classList.remove("big-catch");
  hideToast();

  game.currentFish = null;
  game.targetShadow = findTargetShadow(game.selectedCastPoint);
  game.hasBiteChance = false;
  game.tension = 0;
  game.isReeling = false;
  game.castPoint = { ...game.selectedCastPoint };
  const now = performance.now();
  game.currentArea = getFishingArea(game.castPoint);
  game.nextSnagCheckAt = now + 900;
  game.snagTimer = 0;

  game.castAnimation = {
    startedAt: now,
    duration: 760,
    fromX: canvas.clientWidth * 0.9,
    fromY: canvas.clientHeight * 0.9,
    toX: game.castPoint.x,
    toY: game.castPoint.y,
  };
  game.splashTimer = 0;
  game.splashPoint = null;

  if (game.targetShadow && shouldShadowReact(game.targetShadow, game.castPoint, now)) {
    prepareFishForShadow(game.targetShadow);
    scheduleNibble(now + rand(600, 2400), distanceToShadow(game.castPoint, game.targetShadow));
  } else {
    game.targetShadow = null;
    game.nextNibbleAt = now + rand(7000, 11000);
  }
  game.nibbleStartAt = 0;
  game.nibblePecks = 0;
  game.biteAt = 0;
  game.biteEndsAt = 0;
  game.biteStartedAt = 0;
  game.bobberPattern = null;
  game.bobberPatternStartedAt = 0;

  setState("casting");
  showToast(`${fishingAreas[game.currentArea].name}へ投入`);
  setTimeout(() => {
    if (game.state === "casting") {
      game.castAnimation = null;
      game.splashTimer = 620;
      game.splashPoint = { ...game.castPoint };
      setState("waiting");
    }
  }, game.castAnimation.duration);
}

function prepareFishForShadow(shadow) {
  game.targetShadow = shadow;
  game.hasBiteChance = true;
  game.currentFish = chooseFishForShadow(shadow);

  const [minSize, maxSize] = sizeAdjustedRange(game.currentFish, shadow);
  const [minCoin, maxCoin] = coinAdjustedRange(game.currentFish, shadow);
  const visibleSize = shadow?.visualSizeCm ?? rand(minSize, maxSize);
  game.fishSize = Number(clamp(visibleSize, minSize, maxSize).toFixed(1));
  game.fishCoin = randomInt(minCoin, maxCoin);
  setHookDistanceFromPoint(game.castPoint || game.selectedCastPoint);
  game.fishPower = game.currentFish.power;
  game.fishEnergy = 100;
  const behavior = game.currentFish.fightBehavior || defaultFightBehavior;
  const balancedPower = lerp(1, game.fishPower, 0.72);
  const balancedBurst = clamp(behavior.burstPower || 1, 0.68, 1.34);
  const balancedRecovery = clamp(behavior.recoveryRate || 1, 0.82, 1.22);
  const balancedSwim = clamp(behavior.swimSpeed || 1, 0.72, 1.26);
  const shadowStamina = game.targetShadow?.size === "large" ? 0.74 : game.targetShadow?.size === "medium" ? 0.92 : 1.12;
  game.staminaDrainRate = (game.currentFish.big ? 1.35 : 2.35) * (behavior.staminaDrainRate || 1) * shadowStamina;
  game.reelDrainBonus = (game.currentFish.big ? 1.05 : 1.85) * (behavior.staminaDrainRate || 1) * shadowStamina;
  game.fishPullForce = (0.48 + balancedPower * 0.46 + (game.currentFish.big ? 0.32 : 0)) * balancedBurst;
  game.reelLoad = 10.2 + balancedPower * 5.4;
  game.tensionRecovery = (game.currentFish.big ? 11.2 : 15.2 - balancedPower * 0.75) * balancedRecovery;
  game.fishEscapeForce = (0.1 + balancedPower * 0.13) * balancedSwim;
  game.reelSpeed = Math.max(0.66, 1.48 - balancedPower * 0.12);
  game.surgeTimer = 0;
  game.surgeDuration = 0;
  game.nextSurgeAt = performance.now() + rand(1800, 3600) / clamp(game.fishPower * (behavior.burstPower || 1), 0.7, 2.5);
  game.surgePower = 0;
  initHookedFish(game.castPoint || game.selectedCastPoint);
}

function scheduleNibble(now, distance) {
  const biteSpeed = game.currentFish?.biteFast || 1;
  const proximityFactor = clamp(distance / 92, 0.55, 1.28);
  game.nextNibbleAt = now + rand(900, 2200) * biteSpeed * proximityFactor;
}

function chooseBitePattern(fish) {
  const name = fish?.name || "アジ";
  const pools = {
    イワシ: ["quickBite", "quickBite", "peckThenBite"],
    アジ: ["peckThenBite", "peckThenBite", "dipAndReturn", "quickBite"],
    サバ: ["slideBite", "quickBite", "slideBite", "peckThenBite"],
    メバル: ["dipAndReturn", "peckThenBite", "shyBite"],
    カサゴ: ["bottomThump", "dipAndReturn", "shyBite"],
    "黒鯛（チヌ）": ["dipAndReturn", "shyBite", "slideBite", "peckThenBite"],
  };
  const pool = pools[name] || pools.アジ;
  return pool[randomInt(0, pool.length - 1)];
}

function makeBobberEvents(patternName, fish) {
  const slow = fish?.big ? 1.18 : fish?.name === "カサゴ" ? 1.08 : fish?.biteFast || 1;
  const eventsByPattern = {
    quickBite: [
      { state: "twitch", duration: rand(300, 520), dip: 0.08, amp: 0.42 },
      { state: "bite", duration: rand(1500, 2100), dip: 1, amp: 1.2 },
    ],
    peckThenBite: [
      { state: "twitch", duration: rand(360, 520), dip: 0.08, amp: 0.46 },
      { state: "pecking", duration: rand(520, 760), dip: 0.18, amp: 0.48 },
      { state: "pecking", duration: rand(500, 740), dip: 0.23, amp: 0.54 },
      { state: "dip", duration: rand(520, 760), dip: 0.58, amp: 0.7 },
      { state: "bite", duration: rand(1600, 2300), dip: 1, amp: 1 },
    ],
    dipAndReturn: [
      { state: "pecking", duration: rand(520, 760), dip: 0.18, amp: 0.44 },
      { state: "dip", duration: rand(560, 820), dip: 0.62, amp: 0.55 },
      { state: "falseBite", duration: rand(520, 760), dip: 0.18, amp: 0.5 },
      { state: "dip", duration: rand(520, 820), dip: 0.72, amp: 0.45 },
      { state: "bite", duration: rand(1700, 2500), dip: 1, amp: 0.8 },
    ],
    slideBite: [
      { state: "twitch", duration: rand(300, 480), dip: 0.09, amp: 0.5 },
      { state: "slide", duration: rand(760, 1120), dip: 0.32, dx: rand(18, 34), amp: 0.65 },
      { state: "dip", duration: rand(360, 620), dip: 0.62, dx: rand(16, 30), amp: 0.45 },
      { state: "bite", duration: rand(1500, 2300), dip: 1, dx: rand(8, 18), amp: 0.8 },
    ],
    shyBite: [
      { state: "pecking", duration: rand(620, 920), dip: 0.16, amp: 0.34 },
      { state: "falseBite", duration: rand(620, 960), dip: 0.45, amp: 0.5 },
      { state: "pecking", duration: rand(760, 1160), dip: 0.19, amp: 0.32 },
      { state: "dip", duration: rand(620, 920), dip: 0.55, amp: 0.35 },
      { state: "bite", duration: rand(1800, 2600), dip: 1, amp: 0.55 },
    ],
    bottomThump: [
      { state: "dip", duration: rand(420, 680), dip: 0.48, amp: 0.3 },
      { state: "falseBite", duration: rand(360, 620), dip: 0.24, amp: 0.25 },
      { state: "dip", duration: rand(440, 720), dip: 0.72, amp: 0.25 },
      { state: "bite", duration: rand(1500, 2200), dip: 1, amp: 0.35 },
    ],
  };

  let cursor = 0;
  return (eventsByPattern[patternName] || eventsByPattern.peckThenBite).map((event) => {
    const duration = event.duration * slow;
    const next = { ...event, start: cursor, duration };
    cursor += duration;
    return next;
  });
}

function startBobberPattern(now) {
  const patternName = chooseBitePattern(game.currentFish);
  const events = makeBobberEvents(patternName, game.currentFish);
  const biteEvent = events.find((event) => event.state === "bite") || events[events.length - 1];
  game.bobberPattern = { name: patternName, events };
  game.bobberPatternStartedAt = now;
  game.nibbleStartAt = now;
  game.nibblePecks = events.filter((event) => event.state === "pecking").length;
  game.biteAt = now + biteEvent.start;
  game.biteStartedAt = 0;
  game.biteEndsAt = now + biteEvent.start + biteEvent.duration;
}

function currentBobberEvent(now) {
  if (!game.bobberPattern) return { state: "normal", start: 0, duration: 1, dip: 0, dx: 0, amp: 0 };
  const elapsed = Math.max(0, now - game.bobberPatternStartedAt);
  return game.bobberPattern.events.find((event) => elapsed >= event.start && elapsed < event.start + event.duration)
    || game.bobberPattern.events[game.bobberPattern.events.length - 1]
    || { state: "normal", start: 0, duration: 1, dip: 0, dx: 0, amp: 0 };
}

function bobberEventProgress(now, event = currentBobberEvent(now)) {
  const elapsed = Math.max(0, now - game.bobberPatternStartedAt - event.start);
  return clamp(elapsed / Math.max(event.duration, 1), 0, 1);
}

function distanceToFish(point) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const fishPoint = {
    x: w * game.fishX,
    y: h * game.fishY,
  };
  return Math.hypot(point.x - fishPoint.x, point.y - fishPoint.y);
}

function shadowSizeLabel(size) {
  if (size === "large") return "大きい";
  if (size === "medium") return "中くらい";
  return "小さい";
}

function shadowLabel(shadow) {
  return `${shadowSizeLabel(shadow?.size)}の魚影`;
}

function shadowScreenPoint(shadow) {
  return {
    x: canvas.clientWidth * shadow.x,
    y: canvas.clientHeight * shadow.y,
  };
}

function distanceToShadow(point, shadow) {
  const target = shadowScreenPoint(shadow);
  return Math.hypot(point.x - target.x, point.y - target.y);
}

function findTargetShadow(point) {
  let nearest = null;
  let nearestDistance = Infinity;

  for (const shadow of game.fishShadows) {
    const distance = distanceToShadow(point, shadow);
    if (distance < nearestDistance) {
      nearest = shadow;
      nearestDistance = distance;
    }
  }

  if (!nearest) return null;

  const limit = nearest.size === "large" ? 116 : nearest.size === "medium" ? 92 : 72;
  return nearestDistance <= limit ? nearest : null;
}

function shouldShadowReact(shadow, point, now) {
  if (!shadow || now < shadow.nextDecisionAt) return false;

  const distance = distanceToShadow(point, shadow);
  const limit = shadow.size === "large" ? 116 : shadow.size === "medium" ? 92 : 72;
  const proximity = clamp(1 - distance / limit, 0, 1);
  const sizeBonus = shadow.size === "large" ? -0.06 : shadow.size === "small" ? 0.04 : 0;
  const chance = clamp(0.2 + shadow.interest * 0.45 + proximity * 0.35 + sizeBonus, 0.12, 0.84);
  const reacts = Math.random() < chance;

  shadow.nextDecisionAt = now + (reacts ? rand(2400, 5200) : rand(1800, 4600));
  shadow.curiousUntil = reacts ? now + rand(2500, 5200) : 0;
  return reacts;
}

function fightProgress() {
  if (!game.currentFish || !game.castPoint) return 0;
  return clamp(1 - game.fishDistance / Math.max(game.initialFishDistance, 0.1), 0, 1);
}

function playerWaterPoint(w, h) {
  return {
    x: w * 0.75,
    y: h * 0.82,
  };
}

function calculateHookDistance(point) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const player = playerWaterPoint(w, h);
  const pixelDistance = Math.hypot(point.x - player.x, point.y - player.y);
  const pixelToMeter = 0.042;
  return Number(clamp(0.8 + pixelDistance * pixelToMeter, 1.5, 15).toFixed(1));
}

function setHookDistanceFromPoint(point) {
  const distance = calculateHookDistance(point);
  game.fishDistance = distance;
  game.initialFishDistance = distance;
}

function hookDistanceFromWorld(x, y) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const player = playerWaterPoint(w, h);
  const pixelDistance = Math.hypot(x * w - player.x, y * h - player.y);
  return clamp(pixelDistance * 0.042, 0, Math.max(16, game.initialFishDistance + 4));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function lerpAngle(start, end, amount) {
  const delta = Math.atan2(Math.sin(end - start), Math.cos(end - start));
  return start + delta * amount;
}

function castProgress(now) {
  if (!game.castAnimation) return 1;
  return clamp((now - game.castAnimation.startedAt) / game.castAnimation.duration, 0, 1);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function perspectiveScale(y, h) {
  const t = clamp((y - waterTop(h)) / (h * 0.86 - waterTop(h)), 0, 1);
  return lerp(0.62, 1.18, t);
}

function bobberScaleAt(point, w, h) {
  const player = playerWaterPoint(w, h);
  const pixelDistance = Math.hypot(point.x - player.x, point.y - player.y);
  return clamp(1.22 - pixelDistance / 420, 0.55, 1.12);
}

function tryHook() {
  if (game.state === "waiting") {
    showToast("まだ食っていない", { duration: 1100 });
    return;
  }

  if (game.state !== "nibbling" && game.state !== "bite") return;

  const now = performance.now();
  const hook = hookChanceForCurrentBobber(now);
  if (Math.random() >= hook.chance) {
    showToast(hook.message, { duration: 1200 });
    if (hook.scare) {
      setState("waiting");
      game.hasBiteChance = false;
      game.targetShadow = null;
      game.nibbleStartAt = 0;
      game.bobberPattern = null;
      game.nextNibbleAt = now + rand(2600, 6200);
    }
    return;
  }

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  initHookedFish(getBobberPosition(w, h, now));
  setState("hooked");
  game.isReeling = false;
  if (game.currentFish.big || game.targetShadow?.size === "large") {
    showToast("大物HIT！", { big: true, duration: 1700 });
  } else {
    showToast("HIT！");
  }
}

function hookChanceForCurrentBobber(now) {
  const event = currentBobberEvent(now);
  const fishName = game.currentFish?.name || "";
  const biteElapsed = game.biteStartedAt ? (now - game.biteStartedAt) / 1000 : 0;
  let chance = 0.08;
  let message = "早すぎた";
  let scare = false;

  if (game.state === "nibbling") {
    if (event.state === "pecking" || event.state === "twitch") {
      chance = fishName === "イワシ" ? 0.25 : fishName === "アジ" ? 0.22 : fishName === "サバ" ? 0.18 : fishName === "黒鯛（チヌ）" ? 0.1 : 0.13;
      message = "早アワセ";
      scare = Math.random() < 0.35;
    } else if (event.state === "dip" || event.state === "slide") {
      chance = fishName === "黒鯛（チヌ）" ? 0.34 : fishName === "カサゴ" || fishName === "メバル" ? 0.46 : 0.5;
      message = "すっぽ抜けた";
      scare = Math.random() < 0.25;
    } else if (event.state === "falseBite") {
      chance = fishName === "黒鯛（チヌ）" ? 0.2 : 0.32;
      message = "まだ食い込んでいない";
      scare = Math.random() < 0.45;
    }
  } else if (game.state === "bite") {
    if (biteElapsed < 0.32) chance = 0.9;
    else if (biteElapsed < 1.05) chance = 0.72;
    else if (biteElapsed < 1.9) chance = 0.42;
    else chance = 0.12;

    if (fishName === "イワシ" || fishName === "アジ") chance += 0.07;
    if (fishName === "サバ" && biteElapsed < 1.4) chance += 0.05;
    if (fishName === "メバル" || fishName === "カサゴ") chance += biteElapsed > 0.25 && biteElapsed < 1.4 ? 0.04 : -0.04;
    if (fishName === "黒鯛（チヌ）") chance += biteElapsed < 0.25 ? -0.08 : biteElapsed < 1.5 ? 0.02 : -0.04;
    message = biteElapsed > 1.9 ? "遅すぎた" : "すっぽ抜けた";
    scare = biteElapsed > 1.6 || Math.random() < 0.3;
  }

  return { chance: clamp(chance, 0.04, 0.96), message, scare };
}

function startReeling() {
  if (game.state !== "hooked" && game.state !== "reeling") return;
  game.isReeling = true;
  actionButton.classList.add("pressed");
  startReelTensionSound();
  setState("reeling");
}

function stopReeling() {
  game.isReeling = false;
  actionButton.classList.remove("pressed");
  stopReelSounds();
  if (game.state === "reeling") setState("hooked");
}

function startRetrieving() {
  if (!game.castPoint || (game.state !== "waiting" && game.state !== "nibbling" && game.state !== "retrieving")) return;
  game.isRetrieving = true;
  game.hasBiteChance = false;
  game.targetShadow = null;
  game.nibbleStartAt = 0;
  actionButton.classList.add("pressed");
  startReelLightSound();
  setState("retrieving");
}

function stopRetrieving() {
  game.isRetrieving = false;
  actionButton.classList.remove("pressed");
  stopReelSounds();
  if (game.state === "retrieving") setState("waiting");
}

function settleFightShadow() {
  if (!game.targetShadow) return;
  const shadow = game.targetShadow;
  shadow.vx = rand(-shadow.speed, shadow.speed) * 0.35;
  shadow.vy = rand(-shadow.speed * 0.45, shadow.speed * 0.45) * 0.35;
  shadow.curiousUntil = 0;
  shadow.nextDecisionAt = performance.now() + rand(2600, 6200);
  shadow.direction = shadow.vx >= 0 ? 1 : -1;
  game.targetShadow = null;
  game.hookedFish = null;
  game.surgeTimer = 0;
  game.surgeDuration = 0;
  game.surgePower = 0;
}

function fail(message) {
  game.isReeling = false;
  game.isRetrieving = false;
  settleFightShadow();
  game.highTensionTimer = 0;
  game.lowTensionTimer = 0;
  stopAllEffectSounds();
  actionButton.classList.remove("pressed");
  setState("escaped");
  showToast(message, { duration: 2300 });
}

function catchFish() {
  game.isReeling = false;
  game.isRetrieving = false;
  stopAllEffectSounds();
  actionButton.classList.remove("pressed");
  setState("caught");
  game.highTensionTimer = 0;
  game.lowTensionTimer = 0;

  const isGoodRockFish = game.currentFish.name === "カサゴ" && game.fishSize >= 30;
  const isBigCatch = Boolean(game.currentFish.big || game.targetShadow?.size === "large");
  settleFightShadow();
  game.coins += game.fishCoin;
  if (game.currentFish.name === "アジ") game.ajiCaught += 1;
  game.fishCatchCounts[game.currentFish.name] = (game.fishCatchCounts[game.currentFish.name] || 0) + 1;
  const caught = {
    name: game.currentFish.name,
    size: game.fishSize,
    coin: game.fishCoin,
    big: isBigCatch,
  };
  game.caughtFishList.push(caught);
  startCatchAnimation(caught);

  resultTitle.textContent = isGoodRockFish ? "良型カサゴ！" : isBigCatch ? "大物を釣り上げた！" : "釣れた！";
  resultFish.textContent = game.currentFish.name;
  resultSize.textContent = `${game.fishSize.toFixed(1)}cm`;
  resultCoin.textContent = `${game.currentFish.catchComment || "いい魚が来た！"}　+${game.fishCoin}コイン`;
  resultCard.classList.toggle("big-catch", isBigCatch);
  resultCard.hidden = false;
  drawResultFishArt(isBigCatch);

  showToast("釣れた！", {
    major: true,
    big: isBigCatch,
    duration: isBigCatch ? 1500 : 1000,
  });
}

function drawResultFishArt(big) {
  const artCtx = resultFishArt.getContext("2d");
  const w = resultFishArt.width;
  const h = resultFishArt.height;
  artCtx.clearRect(0, 0, w, h);
  const fishImage = fishArtImages[game.currentFish?.name];

  if (fishImage?.complete && fishImage.naturalWidth > 0) {
    const padding = 12;
    const scale = Math.min((w - padding * 2) / fishImage.naturalWidth, (h - padding * 2) / fishImage.naturalHeight);
    const drawW = fishImage.naturalWidth * scale;
    const drawH = fishImage.naturalHeight * scale;
    artCtx.drawImage(fishImage, (w - drawW) / 2, (h - drawH) / 2, drawW, drawH);
    return;
  }

  artCtx.save();
  artCtx.translate(w * 0.48, h * 0.52);
  artCtx.fillStyle = big ? "rgba(42, 58, 75, 0.92)" : "rgba(28, 118, 160, 0.9)";
  artCtx.beginPath();
  artCtx.ellipse(0, 0, big ? 58 : 46, big ? 20 : 16, 0, 0, Math.PI * 2);
  artCtx.fill();
  artCtx.beginPath();
  artCtx.moveTo(45, 0);
  artCtx.lineTo(76, -18);
  artCtx.lineTo(68, 0);
  artCtx.lineTo(76, 18);
  artCtx.closePath();
  artCtx.fill();
  artCtx.beginPath();
  artCtx.moveTo(-10, -12);
  artCtx.lineTo(16, -32);
  artCtx.lineTo(18, -8);
  artCtx.closePath();
  artCtx.fill();
  artCtx.fillStyle = "rgba(255, 255, 255, 0.72)";
  artCtx.beginPath();
  artCtx.arc(-28, -4, 3.5, 0, Math.PI * 2);
  artCtx.fill();
  artCtx.restore();
}

function preloadFishArtImages() {
  for (const fish of fishData) {
    const path = fish.imagePath;
    if (!path) continue;
    const image = new Image();
    image.src = path;
    fishArtImages[fish.name] = image;
  }
}

function acknowledgeCatch() {
  if (game.state !== "caught") return;
  game.isReeling = false;
  game.isRetrieving = false;
  suppressNextActionClick = false;
  actionButton.classList.remove("pressed");
  resetGameRound();
}

function startCatchAnimation(caught) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const start = game.castPoint ? getBobberPosition(w, h, performance.now()) : { x: w * 0.55, y: h * 0.58 };

  game.catchAnimation = {
    fish: caught,
    startX: start.x,
    startY: start.y,
    endX: 52,
    endY: h - 52,
    startedAt: performance.now(),
    duration: 900,
  };
}

function resetGameRound() {
  stopAllEffectSounds();
  setState("idle");
  resultCard.hidden = true;
  resultCard.classList.remove("big-catch");
  hideToast();
  game.currentFish = null;
  game.selectedCastPoint = null;
  game.castPoint = null;
  game.currentArea = null;
  game.snagTimer = 0;
  game.nextSnagCheckAt = 0;
  game.targetShadow = null;
  game.hasBiteChance = false;
  game.fishDistance = 0;
  game.initialFishDistance = 10;
  game.fishEnergy = 100;
  game.hookedFish = null;
  game.highTensionTimer = 0;
  game.lowTensionTimer = 0;
  game.staminaDrainRate = 0;
  game.reelDrainBonus = 0;
  game.castAnimation = null;
  game.splashTimer = 0;
  game.splashPoint = null;
  game.nibbleStartAt = 0;
  game.nibblePecks = 0;
  game.biteAt = 0;
  game.biteEndsAt = 0;
  game.biteStartedAt = 0;
  game.bobberPattern = null;
  game.bobberPatternStartedAt = 0;
  game.fishPullForce = 0;
  game.reelLoad = 0;
  game.tensionRecovery = 0;
  game.fishEscapeForce = 0;
  game.reelSpeed = 0;
  game.surgeTimer = 0;
  game.surgeDuration = 0;
  game.nextSurgeAt = 0;
  game.surgePower = 0;
  game.tension = 0;
  game.isReeling = false;
  game.isRetrieving = false;
  actionButton.classList.remove("pressed");
}

function handleActionTap() {
  if (suppressNextActionClick) {
    suppressNextActionClick = false;
    return;
  }

  if (game.state === "caught") return;
  if (game.state === "idle") startCast();
  else if (game.state === "waiting") startRetrieving();
  else if (game.state === "nibbling" || game.state === "bite") tryHook();
  else if (game.state === "escaped") resetGameRound();
}

function update(dt, now) {
  if (game.messageTimer > 0) {
    game.messageTimer -= dt;
    if (game.messageTimer <= 0) hideToast();
  }
  if (game.logTimer > 0) {
    game.logTimer = Math.max(0, game.logTimer - dt);
  }

  updateFishShadows(dt);
  updateDistantBoats(dt, now);
  updateFunamushi(dt, now);
  updateCatchAnimation(now);
  if (game.splashTimer > 0) {
    game.splashTimer = Math.max(0, game.splashTimer - dt);
  }

  if (game.state === "waiting") {
    updateWaitingForFish(now);
  }

  if (game.state === "retrieving") {
    updateRetrieving(dt);
  }

  if (game.state === "nibbling" && now >= game.biteAt) {
    if (Math.random() > biteCommitChance()) {
      setState("waiting");
      game.hasBiteChance = false;
      game.targetShadow = null;
      game.nibbleStartAt = 0;
      game.bobberPattern = null;
      game.nextNibbleAt = now + rand(3000, 7800);
      showToast("食わずに離れた...");
      updateHud();
      return;
    }
    setState("bite");
    game.biteStartedAt = now;
    showToast("沈んだ！ アワセろ！");
  }

  if (game.state === "bite" && now >= game.biteEndsAt) {
    fail("逃げられた！");
  }

  if (game.state === "hooked" || game.state === "reeling") {
    updateFight(dt);
  }

  updateHud();
}

function updateCatchAnimation(now) {
  if (!game.catchAnimation) return;
  if (now - game.catchAnimation.startedAt >= game.catchAnimation.duration) {
    game.catchAnimation = null;
  }
}

function updateWaitingForFish(now) {
  const nearbyShadow = findTargetShadow(game.castPoint);

  if (nearbyShadow && nearbyShadow !== game.targetShadow && shouldShadowReact(nearbyShadow, game.castPoint, now)) {
    prepareFishForShadow(nearbyShadow);
    scheduleNibble(now + rand(600, 2600), distanceToShadow(game.castPoint, nearbyShadow));
    showToast(`${shadowLabel(nearbyShadow)}が寄ってきた`, { duration: 1100 });
    return;
  }

  if (!game.hasBiteChance) {
    if (now >= game.nextNibbleAt) {
      showToast("魚影が近づくのを待とう", { duration: 1400 });
      game.nextNibbleAt = now + rand(6500, 10500);
    }
    return;
  }

  if (now >= game.nextNibbleAt) {
    if (Math.random() > nibbleCommitChance()) {
      showToast("ツン... でも見切られた", { duration: 950 });
      game.targetShadow = null;
      game.hasBiteChance = false;
      game.nextNibbleAt = now + rand(3500, 7600);
      return;
    }
    setState("nibbling");
    startBobberPattern(now);
    showToast("ツン... ツン...");
  }
}

function updateRetrieving(dt) {
  if (!game.castPoint) {
    resetGameRound();
    return;
  }

  if (updateSnag(dt)) return;
  maybeTriggerSnag(performance.now());

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const player = playerWaterPoint(w, h);
  const seconds = dt / 1000;
  const pull = clamp(seconds * 1.85, 0, 0.18);
  game.castPoint.x = lerp(game.castPoint.x, player.x, pull);
  game.castPoint.y = lerp(game.castPoint.y, player.y, pull);

  if (Math.hypot(game.castPoint.x - player.x, game.castPoint.y - player.y) < 20) {
    resetGameRound();
    showToast("回収完了", { duration: 900 });
  }
}

function updateSnag(dt) {
  if (game.snagTimer <= 0) return false;
  game.snagTimer = Math.max(0, game.snagTimer - dt);
  game.tension = clamp(game.tension + dt * 0.01, 0, 92);
  if (game.snagTimer === 0) {
    showToast("外れた！");
    game.nextSnagCheckAt = performance.now() + rand(1400, 2600);
  }
  return true;
}

function maybeTriggerSnag(now) {
  if (!game.currentArea || now < game.nextSnagCheckAt || game.snagTimer > 0) return;
  const area = fishingAreas[game.currentArea] || fishingAreas.openWater;
  const point = game.castPoint || playerWaterPoint(canvas.clientWidth, canvas.clientHeight);
  const obstacleBonus = game.currentArea === "tetrapod" && point.x < canvas.clientWidth * 0.34 ? 1.45 : 1;
  const risk = area.snagRisk * obstacleBonus * (game.isReeling || game.isRetrieving ? 1.4 : 0.65);

  game.nextSnagCheckAt = now + rand(700, 1500);
  if (Math.random() < risk * 120) {
    game.snagTimer = rand(1050, 2200);
    game.isReeling = false;
    game.isRetrieving = false;
    stopReelSounds();
    actionButton.classList.remove("pressed");
    showToast("根がかり！");
  }
}

function nibbleCommitChance() {
  const sizeBonus = game.targetShadow?.size === "large" ? -0.04 : game.targetShadow?.size === "small" ? 0.05 : 0;
  return clamp(0.72 + (game.targetShadow?.interest || 0.5) * 0.18 + sizeBonus, 0.58, 0.92);
}

function biteCommitChance() {
  const largePenalty = game.targetShadow?.size === "large" ? -0.08 : 0;
  return clamp(0.68 + (game.targetShadow?.interest || 0.5) * 0.2 + largePenalty, 0.55, 0.88);
}

function pickEscapeMode(behavior) {
  const roll = Math.random();
  if (roll < 0.6) {
    const structureChance = behavior?.structureEscapeChance || 0;
    if (Math.random() < structureChance * 0.55) {
      return Math.random() < 0.5 ? "hide_structure" : "dive_bottom";
    }
    return "run_offshore";
  }
  if (roll < 0.95) return "run_side";
  return "charge_player";
}

function initHookedFish(point) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const player = playerWaterPoint(w, h);
  const px = clamp((point?.x ?? player.x) / Math.max(1, w), 0.12, 0.88);
  const py = clamp((point?.y ?? player.y) / Math.max(1, h), 0.34, 0.84);
  const distance = calculateHookDistance(point || player);

  game.hookedFish = {
    x: px,
    y: py,
    vx: 0,
    vy: 0,
    escapeMode: "tired",
    stamina: 1,
    restTimer: rand(600, 1200),
    modeSign: Math.random() < 0.5 ? -1 : 1,
    targetX: px,
    targetY: py,
  };
  game.fishDistance = distance;
  game.initialFishDistance = distance;
  game.highTensionTimer = 0;
  game.lowTensionTimer = 0;
}

function setHookedEscapeMode(mode) {
  if (!game.hookedFish) return;
  const fish = game.hookedFish;
  fish.escapeMode = mode;
  fish.modeSign = Math.random() < 0.5 ? -1 : 1;

  if (mode === "hide_structure") {
    fish.targetX = rand(0.12, 0.27);
    fish.targetY = rand(0.62, 0.78);
  } else if (mode === "dive_bottom") {
    fish.targetX = clamp(fish.x + rand(-0.08, 0.08), 0.14, 0.86);
    fish.targetY = rand(0.72, 0.84);
  } else if (mode === "run_offshore") {
    fish.targetX = clamp(fish.x + rand(-0.14, 0.14), 0.14, 0.86);
    fish.targetY = rand(0.34, 0.48);
  } else if (mode === "run_side") {
    fish.targetX = fish.modeSign > 0 ? rand(0.7, 0.88) : rand(0.12, 0.3);
    fish.targetY = clamp(fish.y + rand(-0.07, 0.04), 0.34, 0.82);
  } else if (mode === "charge_player") {
    fish.targetX = rand(0.64, 0.8);
    fish.targetY = rand(0.73, 0.84);
  } else {
    fish.targetX = clamp(fish.x + rand(-0.1, 0.1), 0.14, 0.86);
    fish.targetY = clamp(fish.y + rand(-0.06, 0.06), 0.36, 0.82);
  }
}

function updateHookedFishPosition(seconds, energyRate) {
  if (!game.hookedFish) initHookedFish(game.castPoint || game.selectedCastPoint);
  const fish = game.hookedFish;
  fish.stamina = energyRate;
  const behavior = game.currentFish?.fightBehavior || defaultFightBehavior;
  const playerX = 0.75;
  const playerY = 0.82;
  const oldDistance = game.fishDistance;
  const surging = game.surgeTimer > 0;
  const mode = surging ? fish.escapeMode : "tired";
  const baseSpeed = 0.034 * (behavior.swimSpeed || 1) * lerp(0.42, 1, energyRate);
  const burstSpeed = surging ? 2.2 + (game.surgePower || 0) * 0.022 : 0.4;
  let tx = fish.targetX;
  let ty = fish.targetY;
  let modeLoad = 0;
  let reelPenalty = 1;
  let lineOutRun = false;
  let slackRun = false;

  if (mode === "tired") {
    fish.restTimer = Math.max(0, fish.restTimer - seconds * 1000);
    tx = clamp(fish.x + Math.sin(performance.now() / 1300) * 0.018, 0.14, 0.86);
    ty = clamp(fish.y + Math.cos(performance.now() / 1700) * 0.012, 0.36, 0.82);
    modeLoad = 0.5 * energyRate;
  } else if (mode === "run_offshore") {
    modeLoad = 5.6 * (behavior.burstPower || 1) * energyRate;
    lineOutRun = true;
  } else if (mode === "run_side") {
    modeLoad = 3.7 * (behavior.burstPower || 1) * energyRate;
  } else if (mode === "charge_player") {
    modeLoad = -2.4 * energyRate;
    slackRun = true;
  } else if (mode === "dive_bottom") {
    modeLoad = 5.0 * (behavior.burstPower || 1) * energyRate;
    reelPenalty = 0.58;
  } else if (mode === "hide_structure") {
    modeLoad = 6.2 * (behavior.burstPower || 1) * energyRate;
    reelPenalty = 0.52;
    lineOutRun = true;
  } else {
    modeLoad = 2.5 * (behavior.burstPower || 1) * energyRate;
  }

  const dx = tx - fish.x;
  const dy = ty - fish.y;
  const length = Math.hypot(dx, dy) || 1;
  const swimSpeed = baseSpeed * burstSpeed;
  fish.vx = lerp(fish.vx, (dx / length) * swimSpeed, surging ? 0.2 : 0.08);
  fish.vy = lerp(fish.vy, (dy / length) * swimSpeed, surging ? 0.2 : 0.08);

  if (game.isReeling) {
    const pullX = playerX - fish.x;
    const pullY = playerY - fish.y;
    const pullLength = Math.hypot(pullX, pullY) || 1;
    const tiredBonus = lerp(1.28, 0.92, energyRate);
    const pullSpeed = Math.max(0.014, game.reelSpeed * 0.019 * tiredBonus * reelPenalty);
    fish.vx += (pullX / pullLength) * pullSpeed;
    fish.vy += (pullY / pullLength) * pullSpeed;
  }

  fish.x = clamp(fish.x + fish.vx * seconds, 0.1, 0.9);
  fish.y = clamp(fish.y + fish.vy * seconds, 0.34, 0.86);

  const newDistance = hookDistanceFromWorld(fish.x, fish.y);
  game.fishDistance = clamp(lerp(game.fishDistance, newDistance, 0.68), 0, Math.max(16, game.initialFishDistance + 4));

  if (game.targetShadow) {
    game.targetShadow.x = fish.x;
    game.targetShadow.y = fish.y;
    game.targetShadow.vx = fish.vx;
    game.targetShadow.vy = fish.vy;
    game.targetShadow.direction = fish.vx >= 0 ? 1 : -1;
  }

  return {
    mode,
    modeLoad,
    lineOutRun,
    slackRun,
    distanceDeltaPerSecond: (game.fishDistance - oldDistance) / Math.max(seconds, 0.001),
  };
}

function updateFight(dt) {
  const seconds = dt / 1000;
  const now = performance.now();
  const previousTension = game.tension;
  const pulse = 0.65 + Math.sin(now / 220) * 0.35;
  const minEnergy = game.currentFish?.big ? 32 : 25;

  if (updateSnag(dt)) return;
  if (game.isReeling) maybeTriggerSnag(now);
  if (game.isReeling) startReelTensionSound();

  game.fishEnergy = clamp(
    game.fishEnergy - game.staminaDrainRate * seconds - (game.isReeling ? game.reelDrainBonus * seconds : 0),
    minEnergy,
    100,
  );
  const energyRate = clamp(game.fishEnergy / 100, minEnergy / 100, 1);

  if (game.surgeTimer <= 0 && now >= game.nextSurgeAt) {
    startFishSurge(now);
  }

  const wasSurging = game.surgeTimer > 0;
  if (game.surgeTimer > 0) {
    game.surgeTimer = Math.max(0, game.surgeTimer - dt);
  }
  if (wasSurging && game.surgeTimer <= 0 && game.hookedFish) {
    game.hookedFish.restTimer = rand(1100, 2300);
  }

  const surgeRatio = game.surgeTimer > 0 ? game.surgeTimer / Math.max(1, game.surgeDuration) : 0;
  const fightMotion = updateHookedFishPosition(seconds, energyRate);
  const surgeLoad = game.surgePower * (0.38 + surgeRatio * 0.56) * energyRate;
  const fishPullForce = (game.fishPullForce + pulse * game.fishPower * 0.35) * energyRate;
  const reelLoad = game.isReeling ? game.reelLoad : 0;
  const tensionRecovery = game.isReeling ? 0.7 : game.tensionRecovery * (game.surgeTimer > 0 ? 0.28 : 0.95);
  const passivePull = game.isReeling ? fishPullForce : fishPullForce * 0.08;
  const runLoad = Math.max(0, fightMotion.distanceDeltaPerSecond) * 8.4 + Math.max(0, fightMotion.modeLoad) * 1.22;
  const slackRelief = Math.max(0, -fightMotion.distanceDeltaPerSecond) * 5.4 + (fightMotion.slackRun ? 3.5 : 0);

  game.tension += (passivePull + reelLoad + surgeLoad + runLoad - tensionRecovery - slackRelief) * seconds;

  if (!game.isReeling && game.surgeTimer > 0 && (fightMotion.lineOutRun || fightMotion.distanceDeltaPerSecond > 0.08)) {
    game.fishDistance += (game.fishEscapeForce * energyRate + surgeLoad * 0.004) * seconds;
  }

  game.fishDistance = clamp(game.fishDistance, 0, Math.max(16, game.initialFishDistance + 4));
  game.tension = clamp(game.tension, 0, 120);
  const tensionRisePerSecond = (game.tension - previousTension) / Math.max(seconds, 0.001);
  const dragSurge = game.surgeTimer > 0 && game.tension >= 16 && tensionRisePerSecond > 9;
  const dragHighTensionRun = fightMotion.lineOutRun && game.tension >= 62 && tensionRisePerSecond > 4;
  if (dragSurge || dragHighTensionRun) {
    startDragSound();
  } else {
    stopDragSound();
  }

  game.highTensionTimer = game.tension > 98 ? game.highTensionTimer + seconds : Math.max(0, game.highTensionTimer - seconds * 2.2);
  const looseLineRisk = game.tension < 3 && game.fishEnergy < 84 && !game.isReeling && game.surgeTimer <= 0;
  game.lowTensionTimer = looseLineRisk ? game.lowTensionTimer + seconds : Math.max(0, game.lowTensionTimer - seconds * 2.4);

  if (game.tension >= 114 || game.highTensionTimer > 1.35) {
    fail("糸が切れた！");
    return;
  }

  if (game.lowTensionTimer > 6.0) {
    fail("逃げられた！");
    return;
  }

  if (game.fishDistance <= 0.55) {
    catchFish();
  }
}

function startFishSurge(now) {
  if (!game.hookedFish) initHookedFish(game.castPoint || game.selectedCastPoint);
  const behavior = game.currentFish?.fightBehavior || defaultFightBehavior;
  const largeBonus = game.targetShadow?.size === "large" ? 1.22 : game.targetShadow?.size === "medium" ? 1.08 : 0.9;
  const bigFishBonus = game.currentFish?.big ? 1.25 : 1;
  const energyRate = clamp(game.fishEnergy / 100, game.currentFish?.big ? 0.32 : 0.25, 1);
  const mode = pickEscapeMode(behavior);
  setHookedEscapeMode(mode);
  game.surgeDuration = rand(520, 1180) * largeBonus * lerp(0.65, 1, energyRate);
  game.surgeTimer = game.surgeDuration;
  game.surgePower = rand(8, 18) * game.fishPower * largeBonus * bigFishBonus * (behavior.burstPower || 1) * energyRate;
  const activeRate = clamp(game.fishPower * largeBonus * (behavior.burstPower || 1) * lerp(0.5, 1, energyRate), 0.55, 3);
  game.nextSurgeAt = now + rand(2600, 6200) / activeRate;
  showLog(game.currentFish?.big ? "大物が走った" : mode === "charge_player" ? "魚がこちらへ走った" : "魚が走った", { duration: 1100 });
}

function updateFishShadows(dt) {
  const now = performance.now();
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const bobber = game.castPoint ? getBobberPosition(w, h, now) : null;

  for (const school of game.fishSchools) {
    if (now > school.nextTurnAt) {
      school.vx = rand(-school.speed, school.speed);
      school.vy = rand(-school.speed * 0.42, school.speed * 0.42);
      if (Math.abs(school.vx) < school.speed * 0.45) school.vx += (school.vx < 0 ? -1 : 1) * school.speed * 0.45;
      school.nextTurnAt = now + rand(2200, 4800);
    }

    school.x += school.vx * dt;
    school.y += school.vy * dt;

    if (school.x > 0.86) {
      school.x = 0.86;
      school.vx = -Math.abs(school.vx || school.speed);
    } else if (school.x < 0.14) {
      school.x = 0.14;
      school.vx = Math.abs(school.vx || school.speed);
    }

    if (school.y > school.yMax) {
      school.y = school.yMax;
      school.vy = -Math.abs(school.vy || school.speed * 0.24);
    } else if (school.y < school.yMin) {
      school.y = school.yMin;
      school.vy = Math.abs(school.vy || school.speed * 0.24);
    }
  }

  for (const shadow of game.fishShadows) {
    const isTargetFight = shadow === game.targetShadow && (game.state === "hooked" || game.state === "reeling");
    const isInterested = bobber && now < shadow.curiousUntil && (game.state === "waiting" || game.state === "nibbling");
    const speedScale = isTargetFight ? 0.35 : isInterested ? 0.8 : 1;

    if (isTargetFight && game.hookedFish) {
      shadow.x = game.hookedFish.x;
      shadow.y = game.hookedFish.y;
      shadow.vx = game.hookedFish.vx;
      shadow.vy = game.hookedFish.vy;
      shadow.direction = shadow.vx >= 0 ? 1 : -1;
      const targetAngle = Math.atan2(shadow.vy, shadow.vx || 0.000001) + shadow.angleOffset;
      shadow.angle = lerpAngle(shadow.angle, targetAngle, 0.09);
      continue;
    }

    if (shadow.school && !isInterested && !isTargetFight) {
      const schoolX = shadow.school.x + shadow.schoolOffsetX + Math.sin(now / 900 + shadow.schoolPhase) * 0.012;
      const schoolY = shadow.school.y + shadow.schoolOffsetY + Math.cos(now / 1100 + shadow.schoolPhase) * 0.008;
      shadow.vx = lerp(shadow.vx, clamp(schoolX - shadow.x, -0.08, 0.08) * shadow.speed * 7 + shadow.school.vx * 0.6, 0.075);
      shadow.vy = lerp(shadow.vy, clamp(schoolY - shadow.y, -0.06, 0.06) * shadow.speed * 6 + shadow.school.vy * 0.6, 0.075);
    } else if (Math.random() < dt * 0.00022 && !isInterested) {
      shadow.vx = rand(-shadow.speed, shadow.speed);
      shadow.vy = rand(-shadow.speed * 0.55, shadow.speed * 0.55);
      if (Math.abs(shadow.vx) < shadow.speed * 0.35) shadow.vx += shadow.direction * shadow.speed * 0.45;
    }

    if (isInterested) {
      const targetX = bobber.x / w;
      const targetY = bobber.y / h;
      shadow.vx = lerp(shadow.vx, clamp(targetX - shadow.x, -0.08, 0.08) * shadow.speed * 8, 0.05);
      shadow.vy = lerp(shadow.vy, clamp(targetY - shadow.y, -0.08, 0.08) * shadow.speed * 5, 0.05);
    }

    shadow.x += shadow.vx * speedScale * dt;
    shadow.y += shadow.vy * speedScale * dt;
    shadow.direction = shadow.vx >= 0 ? 1 : -1;
    const targetAngle = Math.atan2(shadow.vy, shadow.vx || 0.000001) + shadow.angleOffset;
    shadow.angle = lerpAngle(shadow.angle, targetAngle, 0.035);

    if (shadow.x > 0.88) {
      shadow.x = 0.88;
      shadow.vx = -Math.abs(shadow.vx || shadow.speed);
    } else if (shadow.x < 0.12) {
      shadow.x = 0.12;
      shadow.vx = Math.abs(shadow.vx || shadow.speed);
    }

    if (shadow.y > shadow.yMax) {
      shadow.y = shadow.yMax;
      shadow.vy = -Math.abs(shadow.vy || shadow.speed * 0.3);
    } else if (shadow.y < shadow.yMin) {
      shadow.y = shadow.yMin;
      shadow.vy = Math.abs(shadow.vy || shadow.speed * 0.3);
    }
  }
}

function updateDistantBoats(dt, now) {
  const seconds = dt / 1000;
  const w = canvas.clientWidth;
  const hadBoat = game.distantBoats.length > 0;

  game.distantBoats = game.distantBoats.filter((boat) => {
    boat.x += boat.speed * boat.direction * seconds;
    boat.phase += seconds;
    const margin = boat.width + 48;
    return boat.direction > 0 ? boat.x < w + margin : boat.x > -margin;
  });

  if (game.distantBoats.length > 0) return;

  if (hadBoat) {
    game.nextDistantBoatAt = now + rand(distantBoatSpawnMinMs, distantBoatSpawnMaxMs);
    return;
  }

  if (!game.nextDistantBoatAt) {
    const minDelay = game.hasSpawnedDistantBoat ? distantBoatSpawnMinMs : distantBoatInitialSpawnMinMs;
    const maxDelay = game.hasSpawnedDistantBoat ? distantBoatSpawnMaxMs : distantBoatInitialSpawnMaxMs;
    game.nextDistantBoatAt = now + rand(minDelay, maxDelay);
  }

  if (now >= game.nextDistantBoatAt) {
    spawnDistantBoat();
    game.hasSpawnedDistantBoat = true;
    game.nextDistantBoatAt = 0;
  }
}

function spawnDistantBoat(direction = Math.random() < 0.5 ? 1 : -1) {
  if (game.distantBoats.length > 0) return;

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const scale = rand(0.028, 0.042);
  const width = Math.max(42, (distantBoatImage.naturalWidth || 1448) * scale);
  const height = Math.max(20, (distantBoatImage.naturalHeight || 1086) * scale);
  const waterline = clamp(waterTop(h) - h * 0.075 + rand(-4, 6), h * 0.18, waterTop(h) - 36);

  game.distantBoats.push({
    x: direction > 0 ? -width - 24 : w + width + 24,
    y: waterline,
    speed: rand(7, 15),
    direction,
    scale,
    width,
    height,
    active: true,
    wakeLength: rand(34, 72),
    phase: rand(0, Math.PI * 2),
    opacity: rand(0.62, 0.82),
  });
}

function updateFunamushi(dt, now) {
  if (!game.nextFunamushiAt) {
    game.nextFunamushiAt = now + rand(5000, 17000);
  }

  if (now >= game.nextFunamushiAt) {
    spawnFunamushi();
    game.nextFunamushiAt = now + rand(6000, 20000);
  }

  const seconds = dt / 1000;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const deckTop = h * 0.86;
  game.funamushiList = game.funamushiList.filter((bug) => {
    if (bug.pauseTimer > 0) {
      bug.pauseTimer = Math.max(0, bug.pauseTimer - dt);
    } else {
      if (bug.runDistanceLeft <= 0) {
        const angle = rand(-Math.PI * 0.46, Math.PI * 0.46) + (bug.direction > 0 ? 0 : Math.PI);
        const speed = rand(130, 240);
        bug.vx = Math.cos(angle) * speed;
        bug.vy = Math.sin(angle) * speed;
        bug.runDistanceLeft = rand(28, 150);
      }
      const stepX = bug.vx * seconds;
      const stepY = bug.vy * seconds;
      bug.x += stepX;
      bug.y += stepY;
      bug.runDistanceLeft -= Math.hypot(stepX, stepY);
      bug.y = clamp(bug.y, deckTop + 12, h - 10);
      if (bug.y <= deckTop + 13 || bug.y >= h - 11) {
        bug.vy *= -1;
      }
      if (bug.runDistanceLeft <= 0) {
        bug.pauseTimer = rand(7500, 12500);
      }
    }
    bug.phase += seconds * 12;
    return bug.direction > 0 ? bug.x < w + 42 : bug.x > -42;
  });
}

function spawnFunamushi() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const deckTop = h * 0.86;
  const direction = Math.random() < 0.5 ? 1 : -1;
  const countRoll = Math.random();
  const count = countRoll > 0.93 ? randomInt(2, 3) : 1;
  const baseY = rand(deckTop + 22, h - 16);

  for (let i = 0; i < count; i += 1) {
    const x = direction > 0 ? -28 - i * rand(16, 30) : w + 28 + i * rand(16, 30);
    const angle = rand(-Math.PI * 0.46, Math.PI * 0.46) + (direction > 0 ? 0 : Math.PI);
    const speed = rand(130, 240);
    game.funamushiList.push({
      x,
      y: clamp(baseY + rand(-8, 8), deckTop + 16, h - 12),
      speed,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      runDistanceLeft: rand(28, 150),
      direction,
      pauseTimer: rand(2500, 10500),
      scale: rand(0.0108, 0.0156),
      phase: rand(0, Math.PI * 2),
      opacity: rand(0.62, 0.86),
    });
  }

  if (game.funamushiList.length > 5) {
    game.funamushiList.splice(0, game.funamushiList.length - 5);
  }
}

function updateHud() {
  const isFight = game.state === "hooked" || game.state === "reeling";
  tensionText.textContent = `${Math.round(clamp(game.tension, 0, 100))}%`;
  distanceText.textContent = game.fishDistance > 0 ? `${game.fishDistance.toFixed(1)}m` : "--m";
  tensionFill.style.height = `${clamp(game.tension, 0, 100)}%`;
  tensionWrap.classList.toggle("is-active", isFight);
  fightReadout.classList.toggle("is-active", isFight);
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw(now) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  const photoBackground = drawPhotoBackground(w, h, now);
  if (!photoBackground) {
    drawSky(w, h);
    drawHarbor(w, h);
    drawSea(w, h, now);
  } else {
    drawUnderwaterLightLayer(w, h, now);
  }
  drawDistantBoats(w, h, now);
  drawFishShadows(w, h, now);
  if (photoBackground) {
    drawPhotoWaterOverlay(w, h, now);
  } else {
    drawWaterSurfaceOverlay(w, h, now);
  }
  drawForeground(w, h);
  drawFunamushi(w, h, now);
  drawCatchSummary(w, h);
  drawStatusLog(w, h);
  drawRod(w, h, now);
  drawCastMarker(w, h, now);

  if (game.castPoint) {
    drawLineAndBobber(w, h, now);
  }
  drawCatchAnimation(w, h, now);
  drawBobberZoom(w, h, now);
}

function drawPhotoBackground(w, h, now) {
  if (!backgroundImage.complete || backgroundImage.naturalWidth <= 0) return false;

  const imageRatio = backgroundImage.naturalWidth / backgroundImage.naturalHeight;
  const viewRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = backgroundImage.naturalWidth;
  let sh = backgroundImage.naturalHeight;

  if (imageRatio > viewRatio) {
    sw = backgroundImage.naturalHeight * viewRatio;
    sx = (backgroundImage.naturalWidth - sw) / 2;
  } else {
    sh = backgroundImage.naturalWidth / viewRatio;
    sy = (backgroundImage.naturalHeight - sh) / 2;
  }

  ctx.drawImage(backgroundImage, sx, sy, sw, sh, 0, 0, w, h);

  const seaY = waterTop(h);
  const time = now / 1000;
  const waterTone = ctx.createLinearGradient(0, seaY, 0, h);
  waterTone.addColorStop(0, "rgba(60, 190, 218, 0.04)");
  waterTone.addColorStop(0.52, "rgba(0, 96, 132, 0.05)");
  waterTone.addColorStop(1, "rgba(0, 35, 60, 0.12)");
  ctx.fillStyle = waterTone;
  ctx.fillRect(0, seaY, w, h - seaY);

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i += 1) {
    const y = seaY + h * 0.06 + i * h * 0.075;
    const drift = Math.sin(time * 0.8 + i) * 18;
    ctx.beginPath();
    for (let x = -30; x <= w + 30; x += 22) {
      const waveY = y + Math.sin((x + drift) / 38 + time * 0.55) * 1.8;
      if (x === -30) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }
  ctx.restore();

  return true;
}

function drawPhotoWaterOverlay(w, h, now) {
  const seaY = waterTop(h);
  drawSurfaceReflectionLayer(w, h, now);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 5; i += 1) {
    const y = seaY + 24 + i * 45;
    const offset = Math.sin(now / 1100 + i * 0.9) * 20;
    ctx.strokeStyle = "rgba(220, 250, 255, 0.55)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let x = -40; x <= w + 40; x += 20) {
      const waveY = y + Math.sin((x + offset) / 34) * 1.6 + Math.sin((x - now * 0.01) / 83) * 1.1;
      if (x === -40) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawSurfaceReflectionLayer(w, h, now) {
  if (!waterReflectionImage.complete || waterReflectionImage.naturalWidth <= 0) return;

  const seaY = waterTop(h);
  const area = {
    x: 0,
    y: seaY - 4,
    width: w,
    height: h * 0.38,
  };

  ctx.save();
  ctx.beginPath();
  ctx.rect(area.x, area.y, area.width, area.height);
  ctx.clip();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.07 + Math.sin(now / 1700) * 0.018;
  drawScrollingWaterLayer(waterReflectionImage, area, now, {
    scale: 1.35,
    speedX: 0.012,
    speedY: 0.002,
    extraScale: 1 + Math.sin(now / 3200) * 0.025,
  });
  ctx.globalAlpha = 0.035 + Math.sin(now / 2300 + 1.4) * 0.012;
  drawScrollingWaterLayer(waterReflectionImage, area, now, {
    scale: 1.75,
    speedX: -0.006,
    speedY: 0.001,
    extraScale: 1 + Math.sin(now / 4300) * 0.018,
  });
  ctx.restore();
}

function drawUnderwaterLightLayer(w, h, now) {
  if (!waterCausticsImage.complete || waterCausticsImage.naturalWidth <= 0) return;

  const seaY = waterTop(h);
  const area = {
    x: 0,
    y: seaY + h * 0.08,
    width: w,
    height: h * 0.74,
  };

  ctx.save();
  ctx.beginPath();
  ctx.rect(area.x, area.y, area.width, area.height);
  ctx.clip();
  ctx.globalCompositeOperation = "screen";
  ctx.filter = "brightness(1.35) contrast(1.2)";
  ctx.globalAlpha = 0.17 + Math.sin(now / 1900) * 0.045;
  drawOscillatingWaterLayer(waterCausticsImage, area, now, {
    scale: 1.44,
    amplitudeX: w * 0.075,
    amplitudeY: h * 0.024,
    phaseX: 3300,
    phaseY: 4300,
    extraScale: 1 + Math.sin(now / 3600) * 0.045,
  });
  ctx.globalAlpha = 0.09 + Math.sin(now / 2400 + 1.2) * 0.026;
  drawOscillatingWaterLayer(waterCausticsImage, area, now, {
    scale: 1.9,
    amplitudeX: w * 0.045,
    amplitudeY: h * 0.018,
    phaseX: 4700,
    phaseY: 3100,
    extraScale: 1 + Math.sin(now / 5100 + 0.8) * 0.03,
  });
  ctx.restore();
}

function drawOscillatingWaterLayer(image, area, now, options) {
  const ratio = image.naturalHeight / image.naturalWidth;
  const tileW = area.width * options.scale * (options.extraScale || 1);
  const tileH = tileW * ratio;
  const offsetX = Math.sin(now / options.phaseX) * options.amplitudeX - tileW * 0.48;
  const offsetY = Math.sin(now / options.phaseY + 0.7) * options.amplitudeY - tileH * 0.48;

  for (let y = area.y + offsetY; y < area.y + area.height + tileH; y += tileH) {
    for (let x = area.x + offsetX; x < area.x + area.width + tileW; x += tileW) {
      ctx.drawImage(image, x, y, tileW, tileH);
    }
  }
}

function drawScrollingWaterLayer(image, area, now, options) {
  const ratio = image.naturalHeight / image.naturalWidth;
  const tileW = area.width * options.scale * (options.extraScale || 1);
  const tileH = tileW * ratio;
  const offsetX = ((now * options.speedX) % tileW) - tileW;
  const offsetY = ((now * options.speedY) % tileH) - tileH;

  for (let y = area.y + offsetY; y < area.y + area.height + tileH; y += tileH) {
    for (let x = area.x + offsetX; x < area.x + area.width + tileW; x += tileW) {
      ctx.drawImage(image, x, y, tileW, tileH);
    }
  }
}

function drawSky(w, h) {
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.48);
  sky.addColorStop(0, "#8fcce6");
  sky.addColorStop(0.58, "#c9e8f2");
  sky.addColorStop(1, "#e9f3f1");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.48);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  drawCloud(w * 0.2, h * 0.13, 54);
  drawCloud(w * 0.72, h * 0.19, 42);

  ctx.fillStyle = "rgba(255, 216, 128, 0.62)";
  ctx.beginPath();
  ctx.arc(w * 0.83, h * 0.09, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.fillRect(0, h * 0.28, w, h * 0.035);
}

function drawCloud(x, y, size) {
  ctx.beginPath();
  ctx.arc(x - size * 0.36, y + size * 0.1, size * 0.28, 0, Math.PI * 2);
  ctx.arc(x, y, size * 0.37, 0, Math.PI * 2);
  ctx.arc(x + size * 0.38, y + size * 0.08, size * 0.28, 0, Math.PI * 2);
  ctx.fill();
}

function drawHarbor(w, h) {
  const horizon = waterTop(h) - 16;
  const mountains = ctx.createLinearGradient(0, horizon - 52, 0, horizon);
  mountains.addColorStop(0, "rgba(91, 120, 128, 0.1)");
  mountains.addColorStop(1, "rgba(64, 91, 99, 0.26)");
  ctx.fillStyle = mountains;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(w * 0.12, horizon - 22);
  ctx.lineTo(w * 0.28, horizon - 10);
  ctx.lineTo(w * 0.42, horizon - 35);
  ctx.lineTo(w * 0.58, horizon - 16);
  ctx.lineTo(w * 0.7, horizon - 28);
  ctx.lineTo(w, horizon - 8);
  ctx.lineTo(w, horizon);
  ctx.closePath();
  ctx.fill();

  const wall = ctx.createLinearGradient(0, horizon - 12, 0, horizon + 18);
  wall.addColorStop(0, "rgba(118, 132, 134, 0.54)");
  wall.addColorStop(1, "rgba(76, 91, 96, 0.64)");
  ctx.fillStyle = wall;
  ctx.fillRect(0, horizon - 10, w, 20);

  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, horizon - 7);
  ctx.lineTo(w, horizon - 7);
  ctx.stroke();

  ctx.fillStyle = "rgba(82, 84, 82, 0.42)";
  for (let x = -20; x < w; x += 78) {
    ctx.fillRect(x, horizon - 8, 44, 4);
    ctx.fillRect(x + 14, horizon - 18, 18, 24);
  }

  ctx.fillStyle = "rgba(55, 64, 66, 0.18)";
  for (let x = 12; x < w; x += 56) {
    ctx.fillRect(x, horizon + 4, 28, 2);
  }

  ctx.fillStyle = "rgba(130, 34, 28, 0.7)";
  ctx.fillRect(w * 0.86, horizon - 42, 5, 34);
  ctx.fillStyle = "rgba(245, 245, 235, 0.8)";
  ctx.fillRect(w * 0.855, horizon - 48, 9, 8);
  ctx.fillStyle = "rgba(40, 55, 60, 0.35)";
  ctx.fillRect(w * 0.81, horizon - 4, w * 0.18, 5);
}

function drawSea(w, h, now) {
  const seaY = waterTop(h);
  const sea = ctx.createLinearGradient(0, seaY, 0, h);
  sea.addColorStop(0, "#69bdd2");
  sea.addColorStop(0.34, "#2d96b7");
  sea.addColorStop(0.72, "#126b91");
  sea.addColorStop(1, "#064f76");
  ctx.fillStyle = sea;
  ctx.fillRect(0, seaY, w, h - seaY);

  const murk = ctx.createRadialGradient(w * 0.16, h * 0.78, 20, w * 0.16, h * 0.78, w * 0.78);
  murk.addColorStop(0, "rgba(21, 49, 52, 0.18)");
  murk.addColorStop(0.5, "rgba(14, 74, 95, 0.04)");
  murk.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = murk;
  ctx.fillRect(0, seaY, w, h - seaY);

  drawUnderwaterAreas(w, h);
  drawCaustics(w, h, now);

  for (let i = 0; i < 16; i += 1) {
    const y = seaY + 14 + i * 25;
    const offset = Math.sin(now / 900 + i * 0.7) * 22;
    const alpha = clamp(0.24 - i * 0.008, 0.08, 0.24);
    ctx.strokeStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha})` : `rgba(169,224,235,${alpha * 0.58})`;
    ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.8;
    ctx.beginPath();
    for (let x = -30; x <= w + 30; x += 16) {
      const waveY = y + Math.sin((x + offset) / 28) * 2.8 + Math.sin((x - now * 0.015) / 71) * 1.7;
      if (x === -30) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 8; i += 1) {
    const x = (i * 83 + (now * 0.018) % 83) % (w + 80) - 40;
    const y = seaY + 28 + i * 38;
    ctx.beginPath();
    ctx.ellipse(x, y, 34 + (i % 3) * 16, 2.4, -0.08, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawUnderwaterAreas(w, h) {
  const seaY = waterTop(h);

  ctx.save();
  ctx.fillStyle = "rgba(228, 221, 178, 0.08)";
  ctx.beginPath();
  ctx.ellipse(w * 0.56, h * 0.55, w * 0.46, h * 0.13, -0.08, 0, Math.PI * 2);
  ctx.fill();

  const rockShade = ctx.createRadialGradient(w * 0.14, h * 0.72, 10, w * 0.14, h * 0.72, w * 0.42);
  rockShade.addColorStop(0, "rgba(8, 24, 29, 0.32)");
  rockShade.addColorStop(0.5, "rgba(8, 34, 44, 0.16)");
  rockShade.addColorStop(1, "rgba(8, 34, 44, 0)");
  ctx.fillStyle = rockShade;
  ctx.fillRect(0, seaY, w * 0.55, h - seaY);

  ctx.fillStyle = "rgba(22, 38, 44, 0.28)";
  for (let i = 0; i < 10; i += 1) {
    const x = w * 0.04 + i * w * 0.035;
    const y = seaY + h * 0.22 + (i % 4) * 28;
    drawTetrapod(x, y, 30 + (i % 3) * 7);
  }

  ctx.fillStyle = "rgba(90, 89, 80, 0.13)";
  for (let i = 0; i < 12; i += 1) {
    ctx.beginPath();
    ctx.ellipse(w * (0.08 + i * 0.035), h * (0.72 + (i % 4) * 0.035), 18 + (i % 3) * 8, 7 + (i % 2) * 4, -0.22, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(61, 83, 52, 0.22)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 9; i += 1) {
    const rootX = w * (0.1 + i * 0.045);
    const rootY = h * (0.73 + (i % 4) * 0.035);
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.quadraticCurveTo(rootX - 8, rootY - 18, rootX + Math.sin(i) * 10, rootY - 36 - (i % 3) * 8);
    ctx.stroke();
  }

  const shade = ctx.createLinearGradient(w * 0.73, seaY, w, seaY);
  shade.addColorStop(0, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(9, 31, 40, 0.22)");
  ctx.fillStyle = shade;
  ctx.fillRect(w * 0.62, seaY, w * 0.38, h * 0.58);

  ctx.fillStyle = "rgba(65, 71, 72, 0.18)";
  ctx.fillRect(w * 0.73, seaY + 18, w * 0.04, h * 0.42);
  ctx.fillRect(w * 0.86, seaY + 6, w * 0.035, h * 0.5);

  ctx.strokeStyle = "rgba(255,255,255,0.065)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.moveTo(w * (0.12 + i * 0.12), seaY + 24);
    ctx.lineTo(w * (0.02 + i * 0.15), h * 0.82);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWaterSurfaceOverlay(w, h, now) {
  const seaY = waterTop(h);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(218, 250, 246, 0.11)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 11; i += 1) {
    const y = seaY + 26 + i * 34;
    ctx.beginPath();
    for (let x = -24; x <= w + 24; x += 18) {
      const waveY = y + Math.sin((x + now * 0.025) / 42 + i) * 4 + Math.sin((x - now * 0.014) / 21) * 1.6;
      if (x === -24) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }

  const glare = ctx.createRadialGradient(w * 0.38, seaY + h * 0.18, 12, w * 0.38, seaY + h * 0.18, w * 0.58);
  glare.addColorStop(0, "rgba(255,255,255,0.14)");
  glare.addColorStop(0.28, "rgba(255,255,255,0.05)");
  glare.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glare;
  ctx.fillRect(0, seaY, w, h - seaY);
  ctx.restore();

  ctx.save();
  const depth = ctx.createLinearGradient(0, seaY, 0, h);
  depth.addColorStop(0, "rgba(255,255,255,0.02)");
  depth.addColorStop(0.55, "rgba(3, 47, 67, 0.04)");
  depth.addColorStop(1, "rgba(0, 26, 42, 0.18)");
  ctx.fillStyle = depth;
  ctx.fillRect(0, seaY, w, h - seaY);
  ctx.restore();
}

function drawCaustics(w, h, now) {
  const seaY = waterTop(h);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let row = 0; row < 9; row += 1) {
    const y = seaY + h * 0.08 + row * h * 0.055;
    const alpha = clamp(0.16 - row * 0.008, 0.04, 0.16);
    ctx.strokeStyle = `rgba(190, 244, 238, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -20; x <= w + 20; x += 18) {
      const wave = Math.sin((x + now * 0.018) / 36 + row) * 9 + Math.sin((x - now * 0.012) / 19) * 2;
      if (x === -20) ctx.moveTo(x, y + wave);
      else ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }
  for (let col = 0; col < 8; col += 1) {
    const x = w * (0.1 + col * 0.12) + Math.sin(now / 1100 + col) * 8;
    const alpha = col % 2 ? 0.06 : 0.09;
    ctx.strokeStyle = `rgba(230, 255, 246, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(x, seaY + 24);
    ctx.bezierCurveTo(x - 36, h * 0.48, x + 42, h * 0.63, x - 18, h * 0.82);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTetrapod(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.45);
  const rock = ctx.createLinearGradient(-size * 0.5, -size * 0.5, size * 0.5, size * 0.5);
  rock.addColorStop(0, "rgba(107, 116, 108, 0.42)");
  rock.addColorStop(0.5, "rgba(55, 70, 68, 0.38)");
  rock.addColorStop(1, "rgba(18, 32, 34, 0.34)");
  ctx.fillStyle = rock;
  roundRect(-size * 0.5, -size * 0.16, size, size * 0.32, 4);
  ctx.fill();
  ctx.rotate(Math.PI / 2);
  roundRect(-size * 0.5, -size * 0.16, size, size * 0.32, 4);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(-size * 0.25 + i * size * 0.16, -size * 0.12 + (i % 2) * size * 0.16, size * 0.035, size * 0.018, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function getRodPoints(w, h) {
  const isFight = game.state === "hooked" || game.state === "reeling";
  const isCasting = game.state === "casting" && game.castAnimation;
  const bobber = game.castPoint ? getBobberPosition(w, h, performance.now()) : null;
  const targetX = bobber ? lerp(w * 0.66, bobber.x, 0.32) : w * 0.58;
  const targetY = bobber ? lerp(h * 0.42, bobber.y, 0.22) : h * 0.4;
  const tensionBend = clamp(game.tension / 100, 0, 1);
  const surgeBend = game.surgeTimer > 0 ? clamp(game.surgePower / 70, 0, 0.55) : 0;
  const fightPulse = isFight ? (Math.sin(performance.now() / 85) + 1) * 0.5 : 0;
  const energyRate = clamp(game.fishEnergy / 100, game.currentFish?.big ? 0.32 : 0.25, 1);
  const bend = isFight ? clamp(0.14 + tensionBend * 0.85 + surgeBend + fightPulse * game.fishPower * 0.1 * energyRate, 0.12, 1.35) : 0;

  if (isCasting) {
    const p = castProgress(performance.now());
    const swing = Math.sin(p * Math.PI);
    return {
      baseX: w * 0.92,
      baseY: h * 0.96,
      ctrlX: lerp(w * 0.98, w * 0.72, easeOutCubic(p)),
      ctrlY: lerp(h * 0.72, h * 0.5, easeOutCubic(p)) - swing * h * 0.08,
      tipX: lerp(w * 0.78, targetX, easeOutCubic(p)),
      tipY: lerp(h * 0.66, targetY, easeOutCubic(p)) - swing * h * 0.14,
    };
  }

  return {
    baseX: w * 0.92,
    baseY: h * 0.96,
    ctrlX: isFight ? w * (0.76 + bend * 0.1) : w * 0.78,
    ctrlY: isFight ? h * (0.54 + bend * 0.16) : h * 0.64,
    tipX: isFight ? targetX + w * 0.04 * bend : w * 0.58,
    tipY: isFight ? targetY + h * 0.09 * bend : h * 0.4,
  };
}

function drawRod(w, h) {
  const rod = getRodPoints(w, h);

  if (rodImage.complete && rodImage.naturalWidth > 0) {
    const points = [];
    const steps = 22;
    let curveLength = 0;

    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = (1 - t) * (1 - t) * rod.baseX + 2 * (1 - t) * t * rod.ctrlX + t * t * rod.tipX;
      const y = (1 - t) * (1 - t) * rod.baseY + 2 * (1 - t) * t * rod.ctrlY + t * t * rod.tipY;
      if (i > 0) {
        const prev = points[i - 1];
        curveLength += Math.hypot(x - prev.x, y - prev.y);
      }
      points.push({ x, y });
    }

    const scale = curveLength / rodImage.naturalHeight;
    const drawWidth = rodImage.naturalWidth * scale * 1.18;
    const sourceSlice = rodImage.naturalHeight / steps;
    const drawSlice = curveLength / steps + 2;

    ctx.save();
    ctx.shadowColor = "rgba(0, 10, 12, 0.35)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;

    for (let i = 0; i < steps; i += 1) {
      const t = (i + 0.5) / steps;
      const x = (1 - t) * (1 - t) * rod.baseX + 2 * (1 - t) * t * rod.ctrlX + t * t * rod.tipX;
      const y = (1 - t) * (1 - t) * rod.baseY + 2 * (1 - t) * t * rod.ctrlY + t * t * rod.tipY;
      const dx = 2 * (1 - t) * (rod.ctrlX - rod.baseX) + 2 * t * (rod.tipX - rod.ctrlX);
      const dy = 2 * (1 - t) * (rod.ctrlY - rod.baseY) + 2 * t * (rod.tipY - rod.ctrlY);
      const angle = Math.atan2(dy, dx) + Math.PI / 2;
      const sy = rodImage.naturalHeight - (i + 1) * sourceSlice;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.drawImage(rodImage, 0, sy, rodImage.naturalWidth, sourceSlice + 1, -drawWidth / 2, -drawSlice / 2, drawWidth, drawSlice);
      ctx.restore();
    }

    ctx.restore();
    return;
  }

  ctx.strokeStyle = "rgba(21, 16, 12, 0.28)";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(rod.baseX + 3, rod.baseY + 4);
  ctx.quadraticCurveTo(rod.ctrlX + 4, rod.ctrlY + 4, rod.tipX + 2, rod.tipY + 2);
  ctx.stroke();

  const rodGradient = ctx.createLinearGradient(rod.baseX, rod.baseY, rod.tipX, rod.tipY);
  rodGradient.addColorStop(0, "#2b241d");
  rodGradient.addColorStop(0.35, "#5a3c24");
  rodGradient.addColorStop(1, "#191f22");
  ctx.strokeStyle = rodGradient;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(rod.baseX, rod.baseY);
  ctx.quadraticCurveTo(rod.ctrlX, rod.ctrlY, rod.tipX, rod.tipY);
  ctx.stroke();

  ctx.strokeStyle = "rgba(222, 187, 115, 0.72)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(rod.baseX - 4, rod.baseY - 10);
  ctx.quadraticCurveTo(rod.ctrlX, rod.ctrlY + 3, rod.tipX, rod.tipY);
  ctx.stroke();

  ctx.strokeStyle = "rgba(225, 231, 216, 0.72)";
  ctx.lineWidth = 1.2;
  for (const t of [0.26, 0.48, 0.7, 0.88]) {
    const px = (1 - t) * (1 - t) * rod.baseX + 2 * (1 - t) * t * rod.ctrlX + t * t * rod.tipX;
    const py = (1 - t) * (1 - t) * rod.baseY + 2 * (1 - t) * t * rod.ctrlY + t * t * rod.tipY;
    ctx.beginPath();
    ctx.ellipse(px, py, 4.5 * (1 - t) + 1.5, 2.6, -0.55, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "#d5a37c";
  ctx.beginPath();
  ctx.ellipse(w * 0.94, h * 0.94, 30, 17, -0.55, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#3e2d21";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(rod.baseX - 10, rod.baseY + 10);
  ctx.lineTo(rod.baseX + 16, rod.baseY - 18);
  ctx.stroke();

  ctx.strokeStyle = "rgba(223, 174, 92, 0.86)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rod.baseX - 7, rod.baseY + 8);
  ctx.lineTo(rod.baseX + 12, rod.baseY - 15);
  ctx.stroke();
}

function drawCastMarker(w, h, now) {
  if (game.state !== "idle" || !game.selectedCastPoint) return;

  const point = game.selectedCastPoint;
  const pulse = 1 + Math.sin(now / 260) * 0.08;
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(point.x, point.y, 24 * pulse, 10 * pulse, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 0.56;
  ctx.fillStyle = "#ef3f3f";
  ctx.beginPath();
  ctx.ellipse(point.x, point.y - 5, 6, 10, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(point.x, point.y + 4, 6, 10, 0, 0, Math.PI);
  ctx.fill();
  ctx.restore();
}

function getBobberPosition(w, h, now) {
  const point = game.castPoint;

  if (game.state === "casting" && game.castAnimation) {
    const p = castProgress(now);
    const eased = easeOutCubic(p);
    return {
      x: lerp(game.castAnimation.fromX, game.castAnimation.toX, eased),
      y: lerp(game.castAnimation.fromY, game.castAnimation.toY, eased) - Math.sin(p * Math.PI) * h * 0.22,
    };
  }

  if ((game.state === "hooked" || game.state === "reeling") && game.hookedFish) {
    const fish = game.hookedFish;
    const progress = fightProgress();
    const surgeShake = game.surgeTimer > 0 ? clamp(game.surgePower / 12, 2, 10) : 0;
    return {
      x: fish.x * w + Math.sin(now / 82) * (2 + surgeShake) + Math.sin(now / 430) * (8 - progress * 4),
      y: fish.y * h + Math.sin(now / 96) * (2 + surgeShake * 0.7) + 10,
    };
  }

  const progress = fightProgress();
  const near = playerWaterPoint(w, h);
  let x = lerp(point.x, near.x, progress * 0.92);
  let y = lerp(point.y, near.y, progress * 0.9) + Math.sin(now / 550) * 4;

  if (game.state === "nibbling" || game.state === "bite") {
    const event = currentBobberEvent(now);
    const eventProgress = bobberEventProgress(now, event);
    const subtle = game.currentFish?.subtle ? 0.62 : 1;
    const dip = bobberDipAmount(now);
    const slideEase = Math.sin(eventProgress * Math.PI * 0.5);
    const dx = (event.dx || 0) * slideEase * (game.targetShadow?.direction || 1);
    const nudgeScale = event.state === "twitch" || event.state === "pecking" ? 0.58 : 1;
    const twitch = Math.sin(now / 38) * (event.amp || 0.4) * 3.8 * subtle * nudgeScale;
    x += dx + twitch;
    y += dip * 34 + Math.sin(now / 64) * (event.amp || 0.4) * 2.4 * nudgeScale;
  }

  if (game.state === "hooked" || game.state === "reeling") {
    const surgeShake = game.surgeTimer > 0 ? clamp(game.surgePower / 8, 4, 16) : 0;
    x += Math.sin(now / 70) * (8 - progress * 3 + surgeShake);
    y += Math.sin(now / 60) * (8 - progress * 3 + surgeShake * 0.6) + 8;
  }

  return { x, y };
}

function bobberDipAmount(now) {
  if (game.state !== "nibbling" && game.state !== "bite") return 0;

  const event = currentBobberEvent(now);
  const p = bobberEventProgress(now, event);
  if (event.state === "bite") {
    const hard = game.bobberPattern?.name === "quickBite" || game.currentFish?.name === "サバ";
    return hard ? clamp(0.42 + easeOutCubic(p) * 0.74, 0, 1.16) : clamp(0.7 + Math.sin(p * Math.PI * 0.5) * 0.3, 0, 1);
  }
  if (event.state === "falseBite") return clamp(event.dip * (1 - easeOutCubic(p) * 0.82), 0, 0.62);
  if (event.state === "slide") return clamp(event.dip + Math.sin(p * Math.PI * 2) * 0.07, 0, 0.5);
  if (event.state === "dip") return clamp(Math.sin(p * Math.PI * 0.9) * event.dip, 0, 0.78);
  if (event.state === "pecking") return clamp(Math.abs(Math.sin(p * Math.PI * 2.5)) * event.dip, 0, 0.24);
  if (event.state === "twitch") return clamp(Math.abs(Math.sin(p * Math.PI * 3)) * event.dip, 0, 0.12);
  return 0;
}

function getBobberVisualState(now, bobber, scale) {
  const event = currentBobberEvent(now);
  const p = bobberEventProgress(now, event);
  const dip = bobberDipAmount(now);
  const isFight = game.state === "hooked" || game.state === "reeling";
  const tensionRate = clamp(game.tension / 100, 0, 1);
  let bobberState = game.state === "waiting" ? "waiting" : game.state === "idle" ? "idle" : "normal";
  let angle = Math.sin(now / 520) * 0.06;
  let rippleStrength = 0.25;
  let opacity = 1;
  let verticalOffset = dip * 18 * scale;
  let lateralOffset = 0;

  if (game.state === "nibbling" || game.state === "bite") {
    if (event.state === "twitch") {
      bobberState = "twitch";
      angle += Math.sin(now / 40) * 0.045;
      rippleStrength = 0.42;
    } else if (event.state === "pecking") {
      bobberState = "pecking";
      angle += Math.sin(now / 38) * 0.065;
      rippleStrength = 0.52;
    } else if (event.state === "dip") {
      bobberState = p > 0.72 ? "preBite" : "smallDip";
      angle += Math.sin(now / 80) * 0.07;
      rippleStrength = 0.62;
    } else if (event.state === "falseBite") {
      bobberState = "return";
      angle -= 0.08 * Math.sin(p * Math.PI);
      rippleStrength = 0.45;
    } else if (event.state === "slide") {
      bobberState = "slide";
      angle += 0.18 * (game.targetShadow?.direction || 1);
      lateralOffset = (event.dx || 0) * 0.12 * Math.sin(p * Math.PI);
      rippleStrength = 0.75;
    } else if (event.state === "bite") {
      const hard = game.bobberPattern?.name === "quickBite" || game.currentFish?.name === "サバ";
      bobberState = hard ? "hardSink" : "slowSink";
      angle += hard ? 0.08 * Math.sin(now / 32) : 0.04;
      rippleStrength = hard ? 1 : 0.85;
      opacity = dip > 1 ? 0.62 : 1;
    }
  }

  if (isFight) {
    bobberState = tensionRate > 0.5 ? "tensionTilt" : "hooked";
    angle += lerp(0.18, 0.55, tensionRate) * (game.targetShadow?.direction || 1);
    rippleStrength = lerp(0.65, 1.15, tensionRate);
    verticalOffset += 6 * scale;
  }

  if (game.state === "retrieving") {
    bobberState = "return";
    rippleStrength = 0.42;
  }

  return { bobberState, angle, rippleStrength, opacity, verticalOffset, lateralOffset, dip };
}

function drawLineAndBobber(w, h, now) {
  const rod = getRodPoints(w, h);
  const bobber = getBobberPosition(w, h, now);
  const scale = bobberScaleAt(bobber, w, h);
  const visual = getBobberVisualState(now, bobber, scale);
  const isFight = game.state === "hooked" || game.state === "reeling";
  const isSlack = game.state === "waiting" || game.state === "nibbling";

  ctx.strokeStyle = isFight ? "rgba(240, 246, 248, 0.86)" : "rgba(232, 240, 239, 0.58)";
  ctx.lineWidth = isFight ? 1.25 : 0.9;
  ctx.beginPath();
  ctx.moveTo(rod.tipX, rod.tipY);
  if (isSlack) {
    const midX = (rod.tipX + bobber.x) * 0.5;
    const midY = (rod.tipY + bobber.y) * 0.5 + 10 * scale;
    ctx.quadraticCurveTo(midX, midY, bobber.x, bobber.y);
  } else {
    ctx.lineTo(bobber.x, bobber.y);
  }
  ctx.stroke();

  drawBobberRipples(bobber.x + visual.lateralOffset, bobber.y + 4 * scale, scale, visual.rippleStrength, now);
  drawBobber(bobber.x + visual.lateralOffset, bobber.y + visual.verticalOffset, scale, visual, now, bobber.y + 4 * scale);

  if (game.splashTimer > 0 && game.splashPoint) {
    const splash = game.splashTimer / 620;
    ctx.strokeStyle = `rgba(232, 249, 250, ${0.42 * splash})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(game.splashPoint.x, game.splashPoint.y + 4, 36 * (1 - splash) + 8, 12 * (1 - splash) + 4, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(33, 111, 133, ${0.18 * splash})`;
    ctx.beginPath();
    ctx.ellipse(game.splashPoint.x, game.splashPoint.y + 4, 22 * (1 - splash) + 6, 7 * (1 - splash) + 3, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawBobber(x, y, scale, visual, now, waterSurfaceY = y + 4 * scale) {
  if (bobberImage.complete && bobberImage.naturalWidth > 0) {
    const imageHeight = 46 * scale;
    const imageWidth = imageHeight * (bobberImage.naturalWidth / bobberImage.naturalHeight);
    const top = -imageHeight * 0.52;
    const bottom = imageHeight * 0.48;
    let waterLine = waterSurfaceY - y;
    if (visual.bobberState === "hardSink" || visual.bobberState === "slowSink" || visual.bobberState === "hooked" || visual.bobberState === "tensionTilt") {
      waterLine = top - 2 * scale;
    }
    waterLine = clamp(waterLine, top - 2 * scale, bottom + 2 * scale);

    ctx.save();
    ctx.globalAlpha = visual.opacity;
    ctx.translate(x, y);
    ctx.rotate(visual.angle);
    ctx.shadowColor = "rgba(0, 18, 28, 0.32)";
    ctx.shadowBlur = 5 * scale;
    ctx.shadowOffsetY = 2 * scale;

    if (waterLine > top) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(-imageWidth, top - 4 * scale, imageWidth * 2, waterLine - top + 4 * scale);
      ctx.clip();
      ctx.drawImage(bobberImage, -imageWidth / 2, top, imageWidth, imageHeight);
      ctx.restore();
    }

    if (waterLine < bottom) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(-imageWidth, waterLine, imageWidth * 2, bottom - waterLine + 4 * scale);
      ctx.clip();
      ctx.globalAlpha *= 0.72;
      ctx.filter = "brightness(0.72) saturate(1.25) sepia(0.2) hue-rotate(135deg)";
      ctx.drawImage(bobberImage, -imageWidth / 2, top, imageWidth, imageHeight);
      ctx.restore();
    }

    ctx.restore();
    return;
  }

  const height = 21 * scale;
  const width = 3.75 * scale;
  const topHeight = 17 * scale;
  const bottomHeight = height - topHeight;
  const visibleCrush = visual.bobberState === "hardSink" ? 0.86 : visual.bobberState === "slowSink" ? 0.92 : 1;

  ctx.save();
  ctx.globalAlpha = visual.opacity;
  ctx.translate(x, y);
  ctx.rotate(visual.angle);
  ctx.scale(1, visibleCrush);

  ctx.shadowColor = "rgba(0, 18, 28, 0.32)";
  ctx.shadowBlur = 5 * scale;
  ctx.shadowOffsetY = 2 * scale;

  const bodyGrad = ctx.createLinearGradient(-width, -height * 0.5, width, height * 0.5);
  bodyGrad.addColorStop(0, "#f9fbf8");
  bodyGrad.addColorStop(0.44, "#eef3f2");
  bodyGrad.addColorStop(0.74, "#c9d4d5");
  bodyGrad.addColorStop(1, "#f8fbf8");
  ctx.fillStyle = bodyGrad;
  roundRect(-width * 0.68, -height * 0.08, width * 1.36, bottomHeight, width * 0.62);
  ctx.fill();

  const topGrad = ctx.createLinearGradient(-width, -height * 0.58, width, -height * 0.05);
  topGrad.addColorStop(0, "#ff6b5d");
  topGrad.addColorStop(0.5, "#e72e2c");
  topGrad.addColorStop(1, "#8f171b");
  ctx.fillStyle = topGrad;
  roundRect(-width * 0.42, -height * 0.5, width * 0.84, topHeight, width * 0.42);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.46)";
  roundRect(-width * 0.28, -height * 0.45, width * 0.22, height * 0.72, width * 0.12);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(5, 28, 38, 0.36)";
  ctx.lineWidth = Math.max(0.8, 0.8 * scale);
  roundRect(-width * 0.68, -height * 0.08, width * 1.36, bottomHeight, width * 0.62);
  ctx.stroke();
  roundRect(-width * 0.42, -height * 0.5, width * 0.84, topHeight, width * 0.42);
  ctx.stroke();
  ctx.restore();
}

function drawBobberRipples(x, y, scale, strength, now) {
  const rings = strength > 0.8 ? 3 : strength > 0.45 ? 2 : 1;
  if (rippleImage.complete && rippleImage.naturalWidth > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.translate(x, y);
    ctx.scale(1, 0.36);
    for (let i = 0; i < rings; i += 1) {
      const pulse = (Math.sin(now / (330 + i * 70) + i * 1.3) + 1) * 0.5;
      const size = (52 + strength * 58 + i * 26 + pulse * 14) * scale;
      ctx.globalAlpha = clamp(0.09 + strength * 0.15 - i * 0.035, 0.035, 0.22);
      ctx.drawImage(rippleImage, -size / 2, -size / 2, size, size);
    }
    ctx.restore();
  }

  ctx.save();
  for (let i = 0; i < rings; i += 1) {
    const pulse = (Math.sin(now / (280 + i * 50) + i * 1.7) + 1) * 0.5;
    const rx = (18 + i * 13 + pulse * 8) * scale * lerp(0.75, 1.2, strength);
    const ry = (5 + i * 3 + pulse * 2) * scale * lerp(0.75, 1.18, strength);
    ctx.strokeStyle = `rgba(219, 246, 247, ${0.14 + strength * 0.18 - i * 0.05})`;
    ctx.lineWidth = Math.max(0.7, (0.8 + strength * 0.6 - i * 0.12) * scale);
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBobberZoom(w, h, now) {
  if (!game.castPoint || (game.state !== "nibbling" && game.state !== "bite")) return;

  const panelX = 10;
  const panelY = h * 0.16;
  const panelW = 92;
  const panelH = 112;
  const dip = bobberDipAmount(now);
  const event = currentBobberEvent(now);
  const eventProgress = bobberEventProgress(now, event);
  const previewScale = 1.35;
  const slide = (event.dx || 0) * 0.34 * Math.sin(eventProgress * Math.PI * 0.5) * (game.targetShadow?.direction || 1);
  const previewNudge = event.state === "twitch" || event.state === "pecking" ? 2.3 : 5;
  const shake = (event.state === "bite" ? 1.8 : event.amp || 0.4) * Math.sin(now / 42) * previewNudge + slide;
  const visual = getBobberVisualState(now, { x: 0, y: 0 }, previewScale);
  const bobX = panelX + 46 + shake;
  const bobY = panelY + 56 + dip * 28;

  ctx.save();
  ctx.fillStyle = "rgba(13, 32, 42, 0.78)";
  ctx.strokeStyle = "rgba(217, 238, 238, 0.2)";
  ctx.lineWidth = 1;
  roundRect(panelX, panelY, panelW, panelH, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(236, 246, 246, 0.86)";
  ctx.font = "700 11px sans-serif";
  const labels = {
    twitch: "軽く揺れ",
    pecking: "ツンツン",
    smallDip: "小さく沈む",
    preBite: "本アタリ前",
    return: "戻る",
    slide: "横流れ",
    slowSink: "スーッ",
    hardSink: "ストン",
    hooked: "ヒット中",
    tensionTilt: "テンション",
  };
  ctx.fillText(labels[visual.bobberState] || "ウキ", panelX + 10, panelY + 18);

  ctx.strokeStyle = "rgba(122, 188, 207, 0.36)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(panelX + 12, panelY + 66);
  ctx.quadraticCurveTo(panelX + 44, panelY + 60, panelX + 80, panelY + 66);
  ctx.stroke();

  drawBobberRipples(bobX, panelY + 68, previewScale, visual.rippleStrength, now);
  drawBobber(bobX, bobY, previewScale, visual, now, panelY + 68);
  ctx.restore();
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawDistantBoats(w, h, now) {
  if (!game.distantBoats.length) return;

  for (const boat of game.distantBoats) {
    const bob = Math.sin(now / 1700 + boat.phase) * 1.2;
    const drawW = boat.width;
    const drawH = boat.height;
    const x = boat.x - drawW / 2;
    const wakeStart = boat.x - boat.direction * drawW * 0.36;

    ctx.save();
    ctx.globalAlpha = boat.opacity * 0.38;
    ctx.strokeStyle = "rgba(238, 250, 255, 0.72)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(wakeStart, boat.y + 1 + bob);
    ctx.quadraticCurveTo(wakeStart - boat.direction * boat.wakeLength * 0.5, boat.y + 3 + bob, wakeStart - boat.direction * boat.wakeLength, boat.y + 1 + bob);
    ctx.stroke();
    ctx.globalAlpha = boat.opacity * 0.22;
    ctx.beginPath();
    ctx.moveTo(wakeStart, boat.y + 5 + bob);
    ctx.quadraticCurveTo(wakeStart - boat.direction * boat.wakeLength * 0.42, boat.y + 7 + bob, wakeStart - boat.direction * boat.wakeLength * 0.85, boat.y + 5 + bob);
    ctx.stroke();

    ctx.globalAlpha = boat.opacity;
    if (distantBoatImage.complete && distantBoatImage.naturalWidth > 0) {
      ctx.translate(boat.x, boat.y - drawH * 0.72 + bob);
      ctx.scale(boat.direction > 0 ? 1 : -1, 1);
      ctx.drawImage(distantBoatImage, -drawW / 2, 0, drawW, drawH);
    } else {
      ctx.fillStyle = "rgba(245, 250, 252, 0.76)";
      ctx.fillRect(x, boat.y - 10 + bob, drawW, 8);
      ctx.fillStyle = "rgba(40, 85, 120, 0.52)";
      ctx.fillRect(x + drawW * 0.4, boat.y - 22 + bob, drawW * 0.18, 12);
    }
    ctx.restore();
  }
}

function drawFishShadows(w, h, now) {
  for (const shadow of game.fishShadows) {
    if (shadow === game.targetShadow && (game.state === "hooked" || game.state === "reeling")) continue;
    drawSingleFishShadow(w, h, now, shadow);
  }

  if (game.targetShadow && (game.state === "hooked" || game.state === "reeling")) {
    drawSingleFishShadow(w, h, now, game.targetShadow, true);
  }
}

function drawSingleFishShadow(w, h, now, shadow, hooked = false) {
  const seaY = waterTop(h);
  const isFight = hooked;
  const progress = fightProgress();
  const isNibblingTarget = shadow === game.targetShadow && game.state === "nibbling" && game.castPoint;
  const bobber = (hooked || isNibblingTarget) && game.castPoint ? getBobberPosition(w, h, now) : null;
  const base = shadowScreenPoint(shadow);
  const energyRate = clamp(game.fishEnergy / 100, game.currentFish?.big ? 0.32 : 0.25, 1);
  const x = isFight
    ? base.x + Math.sin(now / 92) * ((6 - progress * 2) * energyRate + (game.surgeTimer > 0 ? game.surgePower * 0.09 : 0))
    : isNibblingTarget && bobber
      ? lerp(base.x, bobber.x + Math.sin(now / 130) * 34, 0.65)
    : base.x;
  const y = isFight
    ? base.y + Math.sin(now / 110) * ((5 - progress * 2) * energyRate + (game.surgeTimer > 0 ? game.surgePower * 0.05 : 0))
    : isNibblingTarget && bobber
      ? lerp(base.y, bobber.y + 34 + Math.sin(now / 170) * 10, 0.62)
    : base.y + Math.sin(now / 360 + shadow.phase) * 8;

  if (y < seaY) return;

  const distanceScale = perspectiveScale(y, h);
  const nearRatio = clamp((distanceScale - 0.62) / (1.18 - 0.62), 0, 1);
  const swimSway = Math.sin(now / 360 + shadow.phase) * 0.055;
  const swimMagnitude = Math.abs(shadow.vx) + Math.abs(shadow.vy) || 0.000001;
  const verticality = clamp(Math.abs(shadow.vy) / swimMagnitude, 0, 1);
  const towardCamera = shadow.vy > 0 ? 1 : 0;
  const viewLength = lerp(1, 0.76, verticality);
  const viewThickness = lerp(1, 1.14, verticality) * (towardCamera ? 1.04 : 0.94);
  const drawW = shadow.baseSize * shadow.scale * distanceScale * 0.32 * viewLength * shadow.aspectJitter * (isFight ? 1.03 : 1);
  const drawH = drawW * 0.48 * viewThickness;
  const depthOpacity = lerp(0.32, 0.82, nearRatio) * (towardCamera ? 1.02 : 0.9);
  const opacity = clamp(shadow.opacity * depthOpacity * (isFight ? 1.12 : isNibblingTarget ? 1.08 : 1), 0.08, 0.38);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(shadow.angle - FISH_SHADOW_FORWARD_ANGLE + swimSway);
  ctx.globalAlpha = opacity;
  ctx.filter = `blur(${lerp(1.55, 0.28, nearRatio) + verticality * 0.12}px)`;
  ctx.globalCompositeOperation = "multiply";

  if (fishShadowImage.complete && fishShadowImage.naturalWidth > 0) {
    const imageRatio = fishShadowImage.naturalHeight / fishShadowImage.naturalWidth;
    ctx.drawImage(fishShadowImage, -drawW / 2, -(drawW * imageRatio) / 2, drawW, drawW * imageRatio);
    ctx.restore();
    return;
  }

  ctx.scale(distanceScale, distanceScale);
  ctx.fillStyle = "rgba(8, 48, 78, 0.42)";
  ctx.beginPath();
  ctx.ellipse(0, 0, shadow.width, shadow.height, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, shadow.height * 0.9);
  ctx.lineTo(-shadow.width * 0.26, shadow.height * 1.55);
  ctx.lineTo(0, shadow.height * 1.34);
  ctx.lineTo(shadow.width * 0.26, shadow.height * 1.55);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-shadow.width * 0.72, -shadow.height * 0.12);
  ctx.lineTo(-shadow.width * 1.25, shadow.height * 0.42);
  ctx.lineTo(-shadow.width * 0.62, shadow.height * 0.22);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(shadow.width * 0.72, -shadow.height * 0.12);
  ctx.lineTo(shadow.width * 1.25, shadow.height * 0.42);
  ctx.lineTo(shadow.width * 0.62, shadow.height * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawForeground(w, h) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(0, waterTop(h), w, 6);

  const deckTop = h * 0.86;
  if (seawallFloorImage.complete && seawallFloorImage.naturalWidth > 0) {
    const deckHeight = h - deckTop;
    const imageRatio = seawallFloorImage.naturalWidth / seawallFloorImage.naturalHeight;
    const viewRatio = w / deckHeight;
    let sx = 0;
    let sy = 0;
    let sw = seawallFloorImage.naturalWidth;
    let sh = seawallFloorImage.naturalHeight;

    if (imageRatio > viewRatio) {
      sw = seawallFloorImage.naturalHeight * viewRatio;
      sx = (seawallFloorImage.naturalWidth - sw) / 2;
    } else {
      sh = seawallFloorImage.naturalWidth / viewRatio;
      sy = Math.max(0, seawallFloorImage.naturalHeight - sh);
    }

    ctx.save();
    ctx.drawImage(seawallFloorImage, sx, sy, sw, sh, 0, deckTop, w, deckHeight);

    const shade = ctx.createLinearGradient(0, deckTop, 0, h);
    shade.addColorStop(0, "rgba(255,255,255,0.04)");
    shade.addColorStop(0.16, "rgba(42, 47, 45, 0.08)");
    shade.addColorStop(1, "rgba(18, 20, 19, 0.2)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, deckTop, w, deckHeight);

    ctx.fillStyle = "rgba(28, 45, 47, 0.24)";
    ctx.fillRect(0, deckTop - 4, w, 7);

    ctx.strokeStyle = "rgba(238, 246, 244, 0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, deckTop + 1);
    ctx.lineTo(w, deckTop + 1);
    ctx.stroke();
    ctx.restore();
    return;
  }

  const deck = ctx.createLinearGradient(0, deckTop, 0, h);
  deck.addColorStop(0, "#9b9285");
  deck.addColorStop(0.3, "#81796f");
  deck.addColorStop(1, "#58534d");
  ctx.fillStyle = deck;
  ctx.fillRect(0, deckTop, w, h - deckTop);

  ctx.fillStyle = "rgba(42, 39, 36, 0.22)";
  for (let y = deckTop + 10; y < h; y += 30) {
    ctx.fillRect(0, y, w, 2);
  }

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = 18; x < w; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, deckTop + 3);
    ctx.lineTo(x + 30, h);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(24, 55, 66, 0.28)";
  ctx.fillRect(0, deckTop - 6, w, 9);

  ctx.fillStyle = "rgba(23, 22, 20, 0.18)";
  for (let i = 0; i < 16; i += 1) {
    const x = (i * 37) % w;
    const y = deckTop + 14 + ((i * 19) % Math.max(20, h - deckTop - 24));
    ctx.beginPath();
    ctx.ellipse(x, y, 1.4 + (i % 3), 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFunamushi(w, h, now) {
  if (!funamushiImage.complete || funamushiImage.naturalWidth <= 0 || game.funamushiList.length === 0) return;

  const deckTop = h * 0.86;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, deckTop + 4, w, h - deckTop - 4);
  ctx.clip();

  for (const bug of game.funamushiList) {
    const bodyH = funamushiImage.naturalHeight * bug.scale;
    const bodyW = funamushiImage.naturalWidth * bug.scale;
    const isMoving = bug.pauseTimer <= 0;
    const angleJitter = isMoving ? Math.sin(now / 170 + bug.phase) * 0.08 : 0;

    ctx.save();
    ctx.globalAlpha = bug.opacity;
    ctx.translate(bug.x, bug.y);
    ctx.rotate(Math.atan2(bug.vy, bug.vx || bug.direction) + Math.PI / 2 + angleJitter);
    ctx.shadowColor = "rgba(8, 9, 8, 0.28)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.drawImage(funamushiImage, -bodyW / 2, -bodyH / 2, bodyW, bodyH);
    ctx.restore();
  }

  ctx.restore();
}

function drawCoolerBox(w, h) {
  const x = 12;
  const y = h - 86;
  const width = 98;
  const height = 58;

  ctx.save();
  ctx.fillStyle = "rgba(12, 44, 64, 0.18)";
  ctx.beginPath();
  ctx.ellipse(x + width * 0.5, y + height + 7, width * 0.52, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e9fbff";
  roundRect(x, y + 10, width, height - 10, 8);
  ctx.fill();

  ctx.fillStyle = "#8bd8ee";
  roundRect(x + 4, y + 4, width - 8, 22, 7);
  ctx.fill();

  ctx.strokeStyle = "rgba(22, 48, 68, 0.22)";
  ctx.lineWidth = 2;
  roundRect(x, y + 10, width, height - 10, 8);
  ctx.stroke();

  ctx.fillStyle = "#ff8b5f";
  roundRect(x + 36, y + 21, 26, 8, 4);
  ctx.fill();

  ctx.fillStyle = "rgba(22, 48, 68, 0.78)";
  ctx.font = "800 12px sans-serif";
  ctx.fillText(`釣果 ${game.caughtFishList.length}`, x + 12, y + 48);

  const recent = game.caughtFishList.slice(-3);
  recent.forEach((fish, index) => {
    drawSmallFishIcon(x + 20 + index * 22, y + 33, fish.big ? 12 : 9, "rgba(8, 76, 112, 0.64)");
  });

  drawCatchCounts(x, y - 98);
  ctx.restore();
}

function drawCatchSummary(w, h) {
  const rows = fishData
    .map((fish) => ({ name: fish.name, count: game.fishCatchCounts[fish.name] || 0 }))
    .filter((item) => item.count > 0);

  if (rows.length === 0) return;

  const text = `釣果：${rows.map((item) => `${item.name}×${item.count}`).join("　")}`;
  const x = 12;
  const y = h - 34;

  ctx.save();
  ctx.font = "800 11px sans-serif";
  const width = Math.min(w - 156, Math.max(120, ctx.measureText(text).width + 22));
  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.strokeStyle = "rgba(22, 48, 68, 0.14)";
  roundRect(x, y - 18, width, 26, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(22, 48, 68, 0.78)";
  ctx.fillText(text, x + 10, y);
  ctx.restore();
}

function drawStatusLog(w, h) {
  if (!game.logMessage || game.logTimer <= 0) return;

  const alpha = clamp(game.logTimer / 260, 0, 1);
  const x = 12;
  const y = h - 68;

  ctx.save();
  ctx.globalAlpha = Math.min(0.82, alpha);
  ctx.font = "800 11px sans-serif";
  const maxTextWidth = Math.max(126, w - 176);
  let displayText = game.logMessage;
  while (ctx.measureText(displayText).width > maxTextWidth && displayText.length > 5) {
    displayText = `${displayText.slice(0, -4)}...`;
  }
  const width = Math.min(w - 154, Math.max(126, ctx.measureText(displayText).width + 22));
  ctx.fillStyle = "rgba(18, 42, 58, 0.54)";
  roundRect(x, y - 18, width, 25, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
  ctx.fillText(displayText, x + 10, y - 1);
  ctx.restore();
}

function drawCatchCounts(x, y) {
  const rows = fishData
    .map((fish) => ({ name: fish.name, count: game.fishCatchCounts[fish.name] || 0 }));

  const width = 126;
  const height = 22 + rows.length * 18;
  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.strokeStyle = "rgba(22, 48, 68, 0.15)";
  ctx.lineWidth = 1;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(22, 48, 68, 0.74)";
  ctx.font = "800 11px sans-serif";
  ctx.fillText("釣果一覧", x + 10, y + 15);

  ctx.font = "700 11px sans-serif";
  rows.forEach((item, index) => {
    ctx.fillText(`${item.name} × ${item.count}`, x + 10, y + 33 + index * 18);
  });
}

function drawCatchAnimation(w, h, now) {
  if (!game.catchAnimation) return;

  const item = game.catchAnimation;
  const t = clamp((now - item.startedAt) / item.duration, 0, 1);
  const ease = 1 - Math.pow(1 - t, 3);
  const arc = Math.sin(t * Math.PI) * 52;
  const x = lerp(item.startX, item.endX, ease);
  const y = lerp(item.startY, item.endY, ease) - arc;
  const scale = lerp(item.fish.big ? 18 : 13, 7, ease);

  ctx.save();
  ctx.globalAlpha = 1 - Math.max(0, t - 0.82) * 4;
  drawSmallFishIcon(x, y, scale, item.fish.big ? "rgba(24, 56, 80, 0.82)" : "rgba(19, 102, 139, 0.82)");
  ctx.restore();
}

function drawSmallFishIcon(x, y, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, size, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + size * 0.78, y);
  ctx.lineTo(x + size * 1.25, y - size * 0.38);
  ctx.lineTo(x + size * 1.25, y + size * 0.38);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.beginPath();
  ctx.arc(x - size * 0.38, y - size * 0.08, Math.max(1.2, size * 0.12), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function loop(now) {
  const dt = Math.min(now - game.lastTime, 40);
  game.lastTime = now;
  update(dt, now);
  draw(now);
  requestAnimationFrame(loop);
}

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  startWaveAudio();
  selectCastPoint(getCanvasPoint(event));
});

actionButton.addEventListener("click", (event) => {
  startWaveAudio();
  handleActionTap(event);
});
actionButton.addEventListener("pointerdown", (event) => {
  startWaveAudio();
  if (game.state === "caught") return;
  if (game.state === "hooked" || game.state === "reeling") {
    event.preventDefault();
    startReeling();
  } else if (game.state === "nibbling" || game.state === "bite") {
    event.preventDefault();
    suppressNextActionClick = true;
    tryHook();
  } else if (game.state === "waiting" || game.state === "retrieving") {
    event.preventDefault();
    suppressNextActionClick = true;
    startRetrieving();
  }
});
resultOkButton.addEventListener("click", () => {
  startWaveAudio();
  acknowledgeCatch();
});
if (soundToggle) {
  soundToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setWaveSoundEnabled(!game.waveSoundEnabled);
  });
}
actionButton.addEventListener("pointerup", () => {
  stopReeling();
  stopRetrieving();
});
actionButton.addEventListener("pointercancel", () => {
  stopReeling();
  stopRetrieving();
});
actionButton.addEventListener("pointerleave", () => {
  stopReeling();
  stopRetrieving();
});

window.addEventListener("blur", () => {
  stopReeling();
  stopRetrieving();
});
window.addEventListener("resize", resizeCanvas);

if ("ResizeObserver" in window) {
  resizeObserver = new ResizeObserver(resizeCanvas);
  resizeObserver.observe(canvas);
}

resizeCanvas();
preloadFishArtImages();
createFishShadows();
updateHud();
updateSoundToggle();
setState("idle");
requestAnimationFrame(loop);
