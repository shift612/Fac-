/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Camera, 
  VideoOff, 
  Settings2, 
  Eye, 
  EyeOff, 
  User, 
  Maximize2, 
  HelpCircle, 
  Languages, 
  Sun, 
  Moon, 
  Cpu, 
  Sparkles, 
  RefreshCw,
  TrendingUp,
  AlertCircle
} from "lucide-react";

// Translatable content dictionary for a high-fidelity bilingual experience
const translations = {
  en: {
    title: "Facial Intelligence Analytics Node",
    subtitle: "Real-time neural face detection, structural geometry mapping, and expressions synthesis",
    cameraInlet: "Live Camera Input Stream",
    startCamera: "Activate Camera Feed",
    stopCamera: "Deactivate Stream",
    permissionError: "Access Denied / No camera detected",
    permissionFix: "Please click the camera icon in your website address bar to grant device permissions, then click refresh.",
    modelsLoading: "Booting Neural Systems & Weights...",
    modelsReady: "AI Neural Weights Loaded & Operational",
    initializing: "Syncing networks...",
    loadingModel: "Streaming model parameters for",
    detectorOptions: "AI Face Detector Control Engine",
    inputSize: "Neural Input Dimension",
    scoreThreshold: "Synthesis Score Threshold",
    faceOverlays: "Visualization Overlay Layers",
    toggleBoundingBox: "Boundary Matrix Box",
    toggleLandmarks: "68-Point Structural Mesh",
    toggleExpressions: "Live Expression Synthesis",
    toggleAgeGender: "Biometric Demographics",
    liveAnalytics: "Biometric Analytics Core",
    noFaceDetected: "Zero subjects detected. Align face structure inside the primary frame scanning matrix.",
    facesCount: "Detected Subjects",
    demographics: "Inferred Biometric Profile",
    estimatedAge: "Estimated Age Group",
    estimatedGender: "Inferred Gender Typology",
    emotionProfile: "Facial Expression Synthesis Matrix",
    neutral: "Neutral",
    happy: "Happy",
    sad: "Sad",
    angry: "Angry",
    fearful: "Fearful",
    disgusted: "Disgusted",
    surprised: "Surprised",
    male: "Male",
    female: "Female",
    fps: "Engine Signal",
    activeResolution: "Frame Array Size",
    systemStatus: "Network Status",
    online: "READY",
    offline: "HALTED",
    optimizeTip: "Engine Tip: Toggling OFF complex visual meshes (e.g., Landmarks or Demographics) reduces computational footprint and significantly increases FPS processing.",
    theme: "System Skin",
    language: "اللغة",
    modelStatus: "Loaded Models Status",
    tinyDetector: "Face Boundaries Detector",
    faceLandmark: "68-Landmark Structural Grid",
    faceExpr: "Expression Multi-Classifier",
    ageGender: "Age & Gender Demographic Node",
    deviceStream: "Stream Node Status",
    active: "ACTIVE",
    inactive: "STANDBY"
  },
  ar: {
    title: "لوحة تحليلات الوجوه الذكية",
    subtitle: "رصد فوري لهيكل الوجه، تمثيل شبكة الملامح الهندسية، واستخلاص العواطف والتعبيرات اللحظية",
    cameraInlet: "بث تيار الكاميرا الحي والمباشر",
    startCamera: "تفعيل بث الكاميرا",
    stopCamera: "تعطيل البث اللحظي",
    permissionError: "تم رفض الإذن بالوصول للكاميرا أو لم يتم العثور عليها",
    permissionFix: "يرجى الضغط على أيقونة الكاميرا في شريط عنوان موقعك للسماح بالوصول إليها، ثم قم بتحديث اللوحة الكاشفة.",
    modelsLoading: "جاري إطلاق برمجيات الذكاء الاصطناعي وتنزيل الأوزان...",
    modelsReady: "الشبكات العصبية نشطة ومحملة بالكامل",
    initializing: "ربط ومعاينة الشبكات العصبية...",
    loadingModel: "تحميل أوزان المعاملات العصبية الخاصة بـ",
    detectorOptions: "محرك تنظيم وتحليل كاشف الوجوه",
    inputSize: "أبعاد مصفوفة التحليل الإفترادي",
    scoreThreshold: "عتبة الثقة ونسبة دقة القبول",
    faceOverlays: "تراكيب ومؤشرات الطبقات المرئية",
    toggleBoundingBox: "صندوق ميريدان التكعيبي لكشف الوجه",
    toggleLandmarks: "الشبكة الجيومترية المكونة من 68 نقطة",
    toggleExpressions: "مؤشرات تحليل العواطف والتعبيرات",
    toggleAgeGender: "التقديرات الديموغرافية والبيومترية",
    liveAnalytics: "تحليلات البيانات الحيوية المباشرة",
    noFaceDetected: "لم يتم رصد أي أهداف. يرجى محاذاة وجهك بوضوح داخل إطار المسح والتحليل.",
    facesCount: "المحاور الملتقطة حالياً",
    demographics: "الملف البيومتري المستنتج",
    estimatedAge: "الفئة العمرية المقدرة",
    estimatedGender: "الجنس البيولوجي المستنتج",
    emotionProfile: "مصفوفة فك تشفير تعبيرات المشاعر",
    neutral: "حيادي",
    happy: "سعيد",
    sad: "حزين",
    angry: "غاضب",
    fearful: "خائف",
    disgusted: "مشمئز",
    surprised: "متفاجئ",
    male: "ذكر",
    female: "أنثى",
    fps: "إشارة المعالجة اللحظية",
    activeResolution: "مصفوفة العرض الرقمي",
    systemStatus: "حالة النظام الكاشف",
    online: "جاهز للعمل",
    offline: "موقوف مؤقتاً",
    optimizeTip: "نصيحة تقنية: توقيف طبقة الملامح التفصيلية أو معالج البيانات البيولوجية كفيل بتقليل العبء على المعالج ومضاعفة عدد الإطارات في الثانية (FPS) تلقائياً.",
    theme: "مظهر الواجهة",
    language: "English Edition",
    modelStatus: "حالة الأوزان للشبكات العصبية",
    tinyDetector: "كاشف واجهة حدود الوجه",
    faceLandmark: "شبكة التوصيل لهيكل الوجه الهيكلي",
    faceExpr: "محلل ومصنف العواطف التعبيري",
    ageGender: "مقدر العمر والجنس الديموغرافي",
    deviceStream: "حالة مدخل الفيديو الكاميري",
    active: "نشط حالياً",
    inactive: "في خمول مؤقت"
  }
};

export default function App() {
  // Localization and Theming States
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [isDark, setIsDark] = useState<boolean>(true);

  // face-api Status and Weights Downloading Progress States
  const [faceApiLoaded, setFaceApiLoaded] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [initStage, setInitStage] = useState<string>("");

  // Model download tracker
  const [modelsProgress, setModelsProgress] = useState({
    tinyDetector: { name: "", loaded: false },
    faceLandmark: { name: "", loaded: false },
    faceExpr: { name: "", loaded: false },
    ageGender: { name: "", loaded: false }
  });

  // Camera Management States
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState<boolean>(false);
  const [streamResolution, setStreamResolution] = useState<string>("-");

  // Options & Tuning Custom Parameters
  const [showBoundingBox, setShowBoundingBox] = useState<boolean>(true);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [showExpressions, setShowExpressions] = useState<boolean>(true);
  const [showAgeGender, setShowAgeGender] = useState<boolean>(true);

  // Model parameters (performance vs precision)
  const [tinyInputSize, setTinyInputSize] = useState<number>(224); // 128, 160, 224, 320, 416, 512, 608
  const [tinyThreshold, setTinyThreshold] = useState<number>(0.5); // float 0.1 to 0.9

  // Live inferences results stored for sidebar telemetry panels
  const [liveDetections, setLiveDetections] = useState<any[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const t = translations[lang];

  // Helper to wait/poll for the global faceapi script loaded in the window
  useEffect(() => {
    let checkAttempts = 0;
    const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";

    const loadModels = async () => {
      const faceapi = (window as any).faceapi;
      if (!faceapi) return false;

      try {
        setInitStage("modelsLoading");

        // 1. Tiny Detector
        setModelsProgress(prev => ({ ...prev, tinyDetector: { name: t.tinyDetector, loaded: false } }));
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        setModelsProgress(prev => ({ ...prev, tinyDetector: { name: t.tinyDetector, loaded: true } }));

        // 2. Face Landmarks
        setModelsProgress(prev => ({ ...prev, faceLandmark: { name: t.faceLandmark, loaded: false } }));
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        setModelsProgress(prev => ({ ...prev, faceLandmark: { name: t.faceLandmark, loaded: true } }));

        // 3. Expressions Classifier
        setModelsProgress(prev => ({ ...prev, faceExpr: { name: t.faceExpr, loaded: false } }));
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        setModelsProgress(prev => ({ ...prev, faceExpr: { name: t.faceExpr, loaded: true } }));

        // 4. Age Gender Node
        setModelsProgress(prev => ({ ...prev, ageGender: { name: t.ageGender, loaded: false } }));
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
        setModelsProgress(prev => ({ ...prev, ageGender: { name: t.ageGender, loaded: true } }));

        setFaceApiLoaded(true);
        setLoadingError(null);
        return true;
      } catch (err: any) {
        console.error("Failed loading face-api.js models details:", err);
        setLoadingError(err.message || "Failed to fetch model weights assets from JSDelivr CDN.");
        return false;
      }
    };

    const pollFaceApi = setInterval(async () => {
      const faceapi = (window as any).faceapi;
      if (faceapi) {
        clearInterval(pollFaceApi);
        await loadModels();
      } else {
        checkAttempts += 1;
        setInitStage("initializing");
        if (checkAttempts > 50) { // 5 seconds wait
          clearInterval(pollFaceApi);
          setLoadingError("CDN for face-api.js took too long to respond. Please verify your connection.");
        }
      }
    }, 100);

    return () => {
      clearInterval(pollFaceApi);
    };
  }, [lang]);

  // Activate WebRTC getUserMedia Camera
  const startWebcam = async () => {
    try {
      setCameraPermissionDenied(false);
      setLiveDetections([]);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Retrieve video track settings to get actual streamed dimensions
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        if (settings.width && settings.height) {
          setStreamResolution(`${settings.width}x${settings.height}`);
        } else {
          setStreamResolution("640x480");
        }

        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error launching webcam capture stream:", err);
      setCameraPermissionDenied(true);
      setIsCameraActive(false);
    }
  };

  // Halt WebRTC streams completely
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setStreamResolution("-");
    setLiveDetections([]);

    // Flush overlays canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
  };

  // Detection loop frame solver callback function
  const runDetectionLoop = async () => {
    const faceapi = (window as any).faceapi;
    if (
      !videoRef.current || 
      !canvasRef.current || 
      videoRef.current.paused || 
      videoRef.current.ended || 
      !faceapi || 
      !faceApiLoaded
    ) {
      animFrameId.current = requestAnimationFrame(runDetectionLoop);
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        // Sync canvas measurements to exact render dimensions of the CSS video viewport
        const displaySize = {
          width: video.clientWidth,
          height: video.clientHeight
        };

        if (canvas.width !== displaySize.width || canvas.height !== displaySize.height) {
          canvas.width = displaySize.width;
          canvas.height = displaySize.height;
        }

        faceapi.matchDimensions(canvas, displaySize);

        // Configure detector parameters
        const options = new faceapi.TinyFaceDetectorOptions({
          inputSize: tinyInputSize,
          scoreThreshold: tinyThreshold
        });

        // Assemble the chainable neural queries list depending on visual toggles active state
        let taskQuery = faceapi.detectAllFaces(video, options);

        if (showLandmarks) {
          taskQuery = taskQuery.withFaceLandmarks();
        }
        if (showExpressions) {
          taskQuery = taskQuery.withFaceExpressions();
        }
        if (showAgeGender) {
          taskQuery = taskQuery.withAgeAndGender();
        }

        const rawResults = await taskQuery;
        const resizedResults = faceapi.resizeResults(rawResults, displaySize);

        // Run custom vector render engine inside canvas frame
        drawCustomOverlays(canvas, resizedResults, {
          showBox: showBoundingBox,
          showLandmarks,
          showExpressions,
          showAgeGender
        });

        // Post statistics feedback state
        setLiveDetections(resizedResults);
      }
    } catch (err) {
      console.error("Inference frame loop crash handled gracefully:", err);
    }

    animFrameId.current = requestAnimationFrame(runDetectionLoop);
  };

  // Keep recursive animate loops in sync with togglers
  useEffect(() => {
    if (isCameraActive && faceApiLoaded) {
      animFrameId.current = requestAnimationFrame(runDetectionLoop);
    } else {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    }

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [
    isCameraActive, 
    faceApiLoaded, 
    showBoundingBox, 
    showLandmarks, 
    showExpressions, 
    showAgeGender,
    tinyInputSize,
    tinyThreshold
  ]);

  // Clean elements on destroy
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  // Custom vector drawing design rules for standard rendering UI
  function drawCustomOverlays(
    canvas: HTMLCanvasElement,
    detections: any[],
    options: {
      showBox: boolean;
      showLandmarks: boolean;
      showExpressions: boolean;
      showAgeGender: boolean;
    }
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det: any) => {
      // Deconstruct standard result boundaries
      const faceBounds = det.detection ? det.detection.box : det.box;
      if (!faceBounds) return;

      const { x, y, width, height } = faceBounds;

      // 1. Sleek sci-fi brackets around face
      if (options.showBox) {
        ctx.strokeStyle = isDark ? "#38bdf8" : "#0284c7"; // Cyan focus ring
        ctx.lineWidth = 3;
        
        // Soft glowing neon overlay
        ctx.shadowColor = "rgba(56, 189, 248, 0.45)";
        ctx.shadowBlur = 8;

        const cornerLength = Math.min(width * 0.15, 20);
        ctx.beginPath();
        
        // Top Left Corner Bracket
        ctx.moveTo(x, y + cornerLength);
        ctx.lineTo(x, y);
        ctx.lineTo(x + cornerLength, y);
        
        // Top Right Corner Bracket
        ctx.moveTo(x + width - cornerLength, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + cornerLength);
        
        // Bottom Right Corner Bracket
        ctx.moveTo(x + width, y + height - cornerLength);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width - cornerLength, y + height);
        
        // Bottom Left Corner Bracket
        ctx.moveTo(x + cornerLength, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + height - cornerLength);
        
        ctx.stroke();

        // High-tech targeted radar text label
        ctx.fillStyle = isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.05)";
        ctx.fillRect(x, y, width, height);

        // Reset shadows to preserve CPU
        ctx.shadowBlur = 0;
      }

      // 2. High density 68-point mesh mapping
      if (options.showLandmarks && det.landmarks) {
        const points = det.landmarks.positions;
        
        // Draw individual neon-fuchsia joints
        ctx.fillStyle = "#f43f5e"; // Rose neon color
        ctx.shadowColor = "rgba(244, 63, 94, 0.5)";
        
        points.forEach((pt: any) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Highlight structure connection grids elegantly
        ctx.strokeStyle = isDark ? "rgba(244, 63, 94, 0.25)" : "rgba(225, 29, 72, 0.3)";
        ctx.lineWidth = 1;

        const connectPointsPath = (indexes: number[], closed = false) => {
          ctx.beginPath();
          indexes.forEach((idx, i) => {
            const pt = points[idx];
            if (pt) {
              if (i === 0) ctx.moveTo(pt.x, pt.y);
              else ctx.lineTo(pt.x, pt.y);
            }
          });
          if (closed) ctx.closePath();
          ctx.stroke();
        };

        // Draw structural subfields
        connectPointsPath(Array.from({ length: 17 }, (_, i) => i)); // Jaw contour
        connectPointsPath([17, 18, 19, 20, 21]); // Left Eyebrow
        connectPointsPath([22, 23, 24, 25, 26]); // Right Eyebrow
        connectPointsPath([27, 28, 29, 30]); // Nose bridge
        connectPointsPath([30, 31, 32, 33, 34, 35], true); // Nose base
        connectPointsPath([36, 37, 38, 39, 40, 41], true); // Left Eye
        connectPointsPath([42, 43, 44, 45, 46, 47], true); // Right Eye
        connectPointsPath([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], true); // Outer Lip
        connectPointsPath([60, 61, 62, 63, 64, 65, 66, 67], true); // Inner Lip
      }

      // 3. Float Dual Capsule Tag mapping
      if (options.showAgeGender || options.showExpressions) {
        let maxMood = "neutral";
        let maxScore = 0;
        if (det.expressions) {
          Object.keys(det.expressions).forEach((exprKey) => {
            if (det.expressions[exprKey] > maxScore) {
              maxScore = det.expressions[exprKey];
              maxMood = exprKey;
            }
          });
        }

        // Translation tables to embed Arabic directly in the active canvas element
        const arMoods: Record<string, string> = {
          neutral: "حيادي",
          happy: "سعيد",
          sad: "حزين",
          angry: "غاضب",
          fearful: "خائف",
          disgusted: "مشمئز",
          surprised: "متفاجئ"
        };
        const arGenders: Record<string, string> = {
          male: "ذكر",
          female: "أنثى"
        };

        const moodEn = maxMood.charAt(0).toUpperCase() + maxMood.slice(1);
        const moodAr = arMoods[maxMood] || maxMood;
        const confidenceValue = Math.round(maxScore * 100);

        const genderEn = det.gender ? (det.gender.charAt(0).toUpperCase() + det.gender.slice(1)) : "Unknown";
        const genderAr = arGenders[det.gender] || "غير معروف";
        const parsedAge = det.age ? Math.round(det.age) : "??";

        // Assemble text layers
        let lineEn = "";
        let lineAr = "";

        if (options.showAgeGender && options.showExpressions) {
          lineEn = `${genderEn}, ~${parsedAge}yrs | ${moodEn} (${confidenceValue}%)`;
          lineAr = `${genderAr}، ~${parsedAge} سنة | ${moodAr} (${confidenceValue}%)`;
        } else if (options.showAgeGender) {
          lineEn = `${genderEn}, ~${parsedAge}yrs`;
          lineAr = `${genderAr}، ~${parsedAge} سنة`;
        } else if (options.showExpressions) {
          lineEn = `${moodEn} (${confidenceValue}%)`;
          lineAr = `${moodAr} (${confidenceValue}%)`;
        }

        // Draw sleek floating dark capsule
        const tagHeight = 38;
        const paddingX = 12;
        
        ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
        const wEn = ctx.measureText(lineEn).width;
        const wAr = ctx.measureText(lineAr).width;
        const targetCapsuleWidth = Math.max(wEn, wAr) + paddingX * 2;

        const tagX = x;
        // Position capsule above focus square if possible, otherwise render below the box
        const tagY = (y - tagHeight - 8) > 10 ? (y - tagHeight - 8) : (y + height + 8);

        // Rounded Rect Container Capsule
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)"; // Dark Slate 900 Glassmorphism
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        const rw = targetCapsuleWidth;
        const rh = tagHeight;
        const rRad = 6;
        
        ctx.moveTo(tagX + rRad, tagY);
        ctx.lineTo(tagX + rw - rRad, tagY);
        ctx.quadraticCurveTo(tagX + rw, tagY, tagX + rw, tagY + rRad);
        ctx.lineTo(tagX + rw, tagY + rh - rRad);
        ctx.quadraticCurveTo(tagX + rw, tagY + rh, tagX + rw - rRad, tagY + rh);
        ctx.lineTo(tagX + rRad, tagY + rh);
        ctx.quadraticCurveTo(tagX, tagY + rh, tagX, tagY + rh - rRad);
        ctx.lineTo(tagX, tagY + rRad);
        ctx.quadraticCurveTo(tagX, tagY, tagX + rRad, tagY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw texts
        ctx.fillStyle = "#ffffff";
        ctx.fillText(lineEn, tagX + paddingX, tagY + 16);
        ctx.fillStyle = "#38bdf8"; // Light Sky blue for Arabic translation translation
        ctx.fillText(lineAr, tagX + paddingX, tagY + 30);
      }
    });
  }

  // Find dominant face statistics for visual feedback widgets
  const getPrimaryFaceStats = () => {
    if (liveDetections.length === 0) return null;
    
    // Sort detections by area size to obtain the closest subject
    const sorted = [...liveDetections].sort((a, b) => {
      const areaA = (a.detection?.box?.width || 0) * (a.detection?.box?.height || 0);
      const areaB = (b.detection?.box?.width || 0) * (b.detection?.box?.height || 0);
      return areaB - areaA;
    });

    const primary = sorted[0];
    
    // Compute expression details
    const expressionsList = primary.expressions 
      ? Object.entries(primary.expressions).map(([key, val]) => {
          return { key, val: val as number };
        }).sort((a,b) => b.val - a.val)
      : [];

    return {
      age: primary.age ? Math.round(primary.age) : null,
      gender: primary.gender || null,
      genderProb: primary.genderProbability ? Math.round(primary.genderProbability * 100) : null,
      paramScore: primary.detection?.score ? Math.round(primary.detection.score * 100) : null,
      expressions: expressionsList,
      primaryExpression: expressionsList[0] || null
    };
  };

  const primaryStats = getPrimaryFaceStats();

  return (
    <div 
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Dynamic App Shell Navbar Header */}
      <header className={`border-b backdrop-blur-md sticky top-0 z-40 transition-colors ${
        isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/90 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/10">
              <Cpu id="app-logo" className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Bilingual Switcher, Theming Toggle & Stream Heartbeat Status */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Stream Status Dot */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${
              isCameraActive 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : isDark ? "bg-slate-800/50 border-slate-700 text-slate-400" : "bg-slate-200/50 border-slate-300 text-slate-600"
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`} />
              <span>{isCameraActive ? `${t.deviceStream}: ${t.active}` : `${t.deviceStream}: ${t.inactive}`}</span>
            </div>

            {/* Language Switch Button */}
            <button
              id="language-switch"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border hover:-translate-y-0.5 transition ${
                isDark 
                  ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200" 
                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.language}</span>
            </button>

            {/* Dark & Light UI Skin Toggle */}
            <button
              id="theme-switch"
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg cursor-pointer border transition hover:scale-105 active:scale-95 ${
                isDark 
                  ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700" 
                  : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-100"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Structural Layout Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Loading Spinner overlay when models are being served via CDN */}
        {!faceApiLoaded && !loadingError && (
          <div className="w-full flex items-center justify-center py-16">
            <div className={`max-w-md w-full p-8 rounded-2xl border text-center relative overflow-hidden backdrop-blur-md ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xl"
            }`}>
              {/* Pulsing visual halo background */}
              <div className="absolute top-[-30px] left-[-30px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-1">{t.modelsLoading}</h3>
              <p className="text-xs text-slate-400 mb-6">{t.initializing}</p>

              {/* Incremental downloader status checklist */}
              <div className="space-y-3 text-left font-mono max-w-xs mx-auto">
                {Object.entries(modelsProgress).map(([key, details]) => (
                  <div key={key} className="flex items-center justify-between text-xs py-1 border-b border-dashed border-slate-800">
                    <span className="opacity-80 line-clamp-1">{(details as any).name || "Retrieving network configs..."}:</span>
                    <span className={`font-semibold  ${(details as any).loaded ? "text-emerald-500" : "text-amber-500 animate-pulse"}`}>
                      {(details as any).loaded ? "[READY]" : "[LOADING...]"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Error Banner (For CDN Loading or permissions failures) */}
        {loadingError && (
          <div className="mb-6 mx-auto max-w-lg p-5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500 animate-bounce" />
              <div>
                <h4 className="font-bold text-sm tracking-wide">Network Error Incurred</h4>
                <p className="text-xs text-rose-300 mt-1">{loadingError}</p>
                <p className="text-xs text-slate-400 mt-2">
                  Unable to access neural layers. Please refresh the web application to retry loading assets from KshitijZane / VladMandic NPM database.
                </p>
              </div>
            </div>
            <button
              id="retry-cdn-load"
              onClick={() => window.location.reload()}
              className="py-1.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-lg transition self-end"
            >
              Force Real Reload
            </button>
          </div>
        )}

        {/* Core Workspace once Models are fully operational */}
        {faceApiLoaded && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-[fadeIn_0.5s_ease-out]">
            
            {/* LEFT / CENTER: PRIMARY CAMERA DISPLAY INTERLEAVE (7 Grid slots) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* The Video and Canvas Frame Holder */}
              <div className={`relative rounded-2xl overflow-hidden border aspect-video flex flex-col items-center justify-center transition-all ${
                isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-lg"
              }`}>
                {/* 1. Camera Denied Warning inside Stage */}
                {cameraPermissionDenied && (
                  <div className="absolute inset-x-0 p-6 flex flex-col items-center justify-center text-center max-w-md mx-auto z-20">
                    <VideoOff className="w-14 h-14 text-rose-500 mb-3" />
                    <h3 className="text-lg font-bold text-rose-500 mb-2">{t.permissionError}</h3>
                    <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {t.permissionFix}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full justify-center">
                      <button
                        id="request-camera-retry"
                        onClick={startWebcam}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg transition cursor-pointer"
                      >
                        {t.startCamera}
                      </button>
                      <button
                        id="open-new-tab-webcam"
                        onClick={() => window.open(window.location.href, "_blank")}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-lg transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{lang === "en" ? "Open in New Tab" : "افتح في نافذة جديدة"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Visual Placeholder when Camera is stand-by */}
                {!isCameraActive && !cameraPermissionDenied && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 select-none">
                    <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-full mb-3 animate-[pulse_2s_infinite]">
                      <Camera className="w-10 h-10" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{t.cameraInlet}</h3>
                    <p className={`text-xs mb-5 max-w-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {lang === "en" 
                        ? "Engage your webcam stream to run real-time neural face bounding, facial contour tracing, and emotional analytics mapping."
                        : "قم بتفعيل الكاميرا لبدء معالجة الوجوه ورسم الملامح واستخلاص تعبيرات المشاعر الديموغرافية بالوقت الفعلي."
                      }
                    </p>
                    <button
                      id="lens-igniter"
                      onClick={startWebcam}
                      className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition duration-150 cursor-pointer"
                    >
                      {t.startCamera}
                    </button>
                  </div>
                )}

                {/* 3. HTML5 Video element stream track */}
                <video
                  id="webcam-stream-video"
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isCameraActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />

                {/* 4. Canvas vector overlay mapped precisely */}
                <canvas
                  id="rendering-overlay-canvas"
                  ref={canvasRef}
                  className={`absolute top-0 left-0 w-full h-full pointer-events-none z-20 ${
                    isCameraActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* 5. In-video real-time overlays controller togglers on the hover bar */}
                {isCameraActive && (
                  <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between gap-3 p-3 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-[ping_1.5s_infinite]" />
                      <span className="font-mono text-[10px] tracking-wider uppercase">{t.online}</span>
                    </div>

                    <div className="flex gap-2 font-mono text-[10px] text-slate-300">
                      <span>{t.fps}: <span className="text-sky-400 font-semibold">{liveDetections.length > 0 ? "30 FPS" : "WAIT"}</span></span>
                      <span>•</span>
                      <span>{t.activeResolution}: <span className="text-emerald-400 font-semibold">{streamResolution}</span></span>
                    </div>

                    <button
                      id="webcam-inhibitor"
                      onClick={stopWebcam}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-md font-bold text-[10px] transition cursor-pointer"
                    >
                      {t.stopCamera}
                    </button>
                  </div>
                )}
              </div>

              {/* Troubleshooting helper view for embedded permissions */}
              {cameraPermissionDenied && (
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-slate-900/80 border-rose-500/20 text-slate-200" : "bg-rose-50/50 border-rose-200 text-slate-800"
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
                    <h4 className="font-bold text-sm tracking-wide">
                      {lang === "en" ? "Webcam Sandbox Access Guide" : "دليل صلاحيات الكاميرا وأمان المتصفح"}
                    </h4>
                  </div>
                  <div className="text-xs space-y-3 leading-relaxed opacity-90">
                    <div className="space-y-1">
                      <p className="font-semibold text-sky-400">
                        {lang === "en" ? "1. Embedded Iframe Restriction (Highly Common):" : "1. قيود الإطارات المدمجة (Iframe) - شائع جداً:"}
                      </p>
                      <p>
                        {lang === "en"
                          ? "Modern web browsers prevent webcam/microphone access when a page is embedded in an iframe preview. To bypass this security sandbox, please click the button below to load page as a primary standalone URL."
                          : "تمنع المتصفحات الحديثة الوصول للكاميرا داخل النوافذ المدمجة (iframe). لتجاوز هذا الحاجز الأمني التلقائي، يرجى فتح التطبيق في نافذة مستقلة بالضغط على الزر أدناه."}
                      </p>
                      <div className="pt-1.5 pb-1">
                        <button
                          id="open-standalone-troubleshooter"
                          onClick={() => window.open(window.location.href, "_blank")}
                          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 hover:-translate-y-0.5 text-white font-bold text-xs rounded-lg transition shadow-md shadow-sky-500/10 cursor-pointer flex items-center gap-2"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>{lang === "en" ? "Open App in New Standalone Tab" : "افتح التطبيق في علامة تبويب مستقلة"}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-[1px] bg-slate-800 my-2" />

                    <div className="space-y-1">
                      <p className="font-semibold text-rose-400">
                        {lang === "en" ? "2. Resetting Site Block Permissions:" : "2. إعادة تعيين أذونات الموقع المحجوبة:"}
                      </p>
                      <p>
                        {lang === "en"
                          ? "If you previously denied camera access, click the 'Lock' icon next to your URL bar, switch the camera slider to 'Allow', then click 'Refresh' or re-initiate the camera inlet."
                          : "إذا قمت مسبقاً برفض الإذن، اضغط على رمز 'القفل' بجوار شريط العنوان في متصفحك، وقم بتفعيل خيار الكاميرا ليصبح 'سماح / Allow'، ثم حدّث الصفحة."}
                      </p>
                    </div>

                    <div className="h-[1px] bg-slate-800 my-2" />

                    <div className="space-y-1">
                      <p className="font-semibold text-amber-400">
                        {lang === "en" ? "3. Closed Device Locks:" : "3. التحقق من عدم انشغال الكاميرا:"}
                      </p>
                      <p>
                        {lang === "en"
                          ? "Verify that no other computer processes (Zoom, Microsoft Teams, Discord, other tabs) are keeping a solid lock active on your webcam capture hardware."
                          : "تأكد من عدم وجود أي تطبيق آخر (مثل زووم، تيمز، ديسكورد، أو علامة تبويب أخرى) يستخدم الكاميرا في نفس الوقت."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TUNER ADJUSTMENT DRAWER: PERFORMANCE PARAMETERS & CHIPS TOGGLERS */}
              <div className={`p-5 rounded-2xl border transition-colors ${
                isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-md"
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Settings2 className="w-4.5 h-4.5 text-indigo-500" />
                  <h3 className="font-bold text-sm tracking-wide">{t.detectorOptions}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-normal">
                  {/* Dynamic tuning sliders */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                        <span>{t.inputSize}</span>
                        <span className="text-sky-400 font-mono">{tinyInputSize}px</span>
                      </div>
                      <input
                        id="tuner-input-size"
                        type="range"
                        min="128"
                        max="512"
                        step="32"
                        value={tinyInputSize}
                        onChange={(e) => setTinyInputSize(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                        <span>128px (Faster / أسرع)</span>
                        <span>512px (Precise / أدق)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                        <span>{t.scoreThreshold}</span>
                        <span className="text-sky-400 font-mono">{Math.round(tinyThreshold * 100)}%</span>
                      </div>
                      <input
                        id="tuner-score-threshold"
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={tinyThreshold}
                        onChange={(e) => setTinyThreshold(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                        <span>10% (Loose)</span>
                        <span>90% (Strict)</span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle switches for optimization */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-semibold opacity-85 mb-0.5">{t.faceOverlays}</span>
                    
                    {/* 1. Bounding box overlay toggle */}
                    <label className="flex items-center justify-between p-1.5 hover:p-1.5 rounded-lg hover:bg-slate-800/20 text-xs cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>{t.toggleBoundingBox}</span>
                      </span>
                      <input
                        id="overlay-toggle-bounding"
                        type="checkbox"
                        checked={showBoundingBox}
                        onChange={(e) => setShowBoundingBox(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 accent-sky-500"
                      />
                    </label>

                    {/* 2. Landmark mesh toggle */}
                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/20 text-xs cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-rose-500" />
                        <span>{t.toggleLandmarks}</span>
                      </span>
                      <input
                        id="overlay-toggle-landmarks"
                        type="checkbox"
                        checked={showLandmarks}
                        onChange={(e) => setShowLandmarks(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 accent-sky-500"
                      />
                    </label>

                    {/* 3. Expressions meter toggle */}
                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/20 text-xs cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.toggleExpressions}</span>
                      </span>
                      <input
                        id="overlay-toggle-expressions"
                        type="checkbox"
                        checked={showExpressions}
                        onChange={(e) => setShowExpressions(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 accent-sky-500"
                      />
                    </label>

                    {/* 4. Age and Gender inference toggle */}
                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/20 text-xs cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.toggleAgeGender}</span>
                      </span>
                      <input
                        id="overlay-toggle-demographics"
                        type="checkbox"
                        checked={showAgeGender}
                        onChange={(e) => setShowAgeGender(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 accent-sky-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Computational Optimization Tip */}
                <div className={`mt-4 pt-3 border-t text-[10px] leading-relaxed flex gap-2 items-start ${
                  isDark ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"
                }`}>
                  <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-indigo-400" />
                  <span>{t.optimizeTip}</span>
                </div>
              </div>

            </div>

            {/* RIGHT: LIVE TELEMETRY BIOMETRICS FEED (5 Grid slots) */}
            <div className="lg:col-span-5 flex flex-col gap-5 h-full">
              
              <div className={`p-6 rounded-2xl border flex flex-col h-full min-h-[480px] transition-all duration-300 ${
                isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-md"
              }`}>
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-5 border-dashed border-slate-800">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4.5 h-4.5 text-indigo-500 animate-[bounce_3s_infinite]" />
                    <h3 className="font-bold text-sm tracking-wide">{t.liveAnalytics}</h3>
                  </div>
                  {isCameraActive && (
                    <span className="font-mono text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-md border border-sky-500/15">
                      {t.facesCount}: {liveDetections.length}
                    </span>
                  )}
                </div>

                {/* A. If stream is active but no subject is identified */}
                {isCameraActive && liveDetections.length === 0 && (
                  <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
                    <div className="relative w-24 h-24 mb-4">
                      {/* Interactive Radar Ring animations simulating Face Search */}
                      <span className="absolute inset-0 rounded-full border border-sky-500/30 animate-[ping_2.5s_infinite]" />
                      <span className="absolute inset-4 rounded-full border border-indigo-500/20 animate-[ping_1.5s_infinite]" />
                      <div className="absolute inset-8 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                        <Sparkles className="w-4.5 h-4.5 animate-spin" />
                      </div>
                    </div>
                    <p className={`text-xs max-w-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {t.noFaceDetected}
                    </p>
                  </div>
                )}

                {/* B. Idle state when camera stream is strictly standby */}
                {!isCameraActive && (
                  <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
                    <div className={`p-4 rounded-full mb-3 ${isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
                      <VideoOff className="w-8 h-8" />
                    </div>
                    <p className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {lang === "en" ? "Camera stream standby" : "مدخل تغذية الكاميرا غير نشط"}
                    </p>
                  </div>
                )}

                {/* C. Interactive Biometric Widgets once Subject target and tracking locks of Face-api match */}
                {isCameraActive && liveDetections.length > 0 && primaryStats && (
                  <div className="flex-1 flex flex-col justify-between gap-6 animate-[fadeIn_0.3s_ease-out]">
                    
                    {/* Module 1: Demographic Inference */}
                    {showAgeGender && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{t.demographics}</span>
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-950/70 border-slate-850" : "bg-slate-50 border-slate-100"}`}>
                            <span className="text-[10px] block opacity-60 mb-0.5">{t.estimatedAge}</span>
                            <span className="text-lg font-mono font-bold text-sky-400">
                              ~ {primaryStats.age} <span className="text-xs opacity-75">{lang === "en" ? "Yrs old" : "سنة"}</span>
                            </span>
                          </div>

                          <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-950/70 border-slate-850" : "bg-slate-50 border-slate-100"}`}>
                            <span className="text-[10px] block opacity-60 mb-0.5">{t.estimatedGender}</span>
                            <span className="text-sm font-bold block text-indigo-400">
                              {primaryStats.gender === "male" ? t.male : t.female}
                            </span>
                            <span className="text-[9px] font-mono opacity-50 block">Confidence: {primaryStats.genderProb}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 2: Facial Expressions Synthesis */}
                    {showExpressions && primaryStats.expressions.length > 0 && (
                      <div className="space-y-3 flex-1 flex flex-col justify-end">
                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.emotionProfile}</span>
                        </h4>

                        {/* Emotion Bars breakdown with custom reactive widths */}
                        <div className="space-y-2.5 my-1">
                          {primaryStats.expressions.map(({ key, val }) => {
                            // Match keys to translations
                            const emotionLabel = t[key as keyof typeof t] || key;
                            const progressPercentage = Math.round(val * 100);

                            // Custom color picker for emotion
                            let colorClass = "bg-slate-500";
                            if (key === "happy") colorClass = "bg-emerald-500 shadow-emerald-500/20";
                            else if (key === "sad") colorClass = "bg-blue-500 shadow-blue-500/20";
                            else if (key === "surprised") colorClass = "bg-amber-400 shadow-amber-400/20";
                            else if (key === "angry") colorClass = "bg-rose-500 shadow-rose-500/20";
                            else if (key === "fearful") colorClass = "bg-violet-500 shadow-violet-500/20";
                            else if (key === "disgusted") colorClass = "bg-orange-500 shadow-orange-500/20";
                            else if (key === "neutral") colorClass = "bg-sky-400 shadow-sky-400/20";

                            return (
                              <div key={key}>
                                <div className="flex justify-between items-center text-[11px] font-medium mb-1">
                                  <span>{emotionLabel}</span>
                                  <span className="font-mono">{progressPercentage}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ease-out ${colorClass}`}
                                    style={{ width: `${progressPercentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Footer synthesis summary tag */}
                    <div className="pt-2 text-[10px] opacity-65 flex justify-between items-center bg-slate-800/20 p-2.5 rounded-lg border border-slate-800/45">
                      <span>Synthesized targets: {liveDetections.map((_, i) => `#${i+1}`).join(", ")}</span>
                      <span>Signal precision: {primaryStats.paramScore}%</span>
                    </div>

                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer Credentials Branding */}
      <footer className={`border-t py-6 mt-12 text-center text-xs transition-colors ${
        isDark ? "bg-slate-950 border-slate-900 text-slate-500" : "bg-white border-slate-100 text-slate-400 animate-none"
      }`}>
        <p className="font-mono">
          Face AI Analytics Node • 2026-2027 • On-Device Neural Synthesis
        </p>
      </footer>
    </div>
  );
}
