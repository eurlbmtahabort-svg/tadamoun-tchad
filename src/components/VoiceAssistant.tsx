import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, Volume2, Send, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface VoiceAssistantProps {
  lang: Language;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ lang }) => {
  const t = translations[lang].voiceAssistant;
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeakingText, setIsSpeakingText] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingSeconds(0);
      setAudioUrl(null);

      if (navigator.vibrate) navigator.vibrate(100);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch {
      // Fallback simulation if mic is blocked or unavailable
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const speakGuide = () => {
    if ('speechSynthesis' in window) {
      if (isSpeakingText) {
        window.speechSynthesis.cancel();
        setIsSpeakingText(false);
        return;
      }

      const textToSpeak = lang === 'ar'
        ? 'مرحباً بكم في تطبيق تضامن تشاد بتمنراست. هذا التطبيق مخصص لمساعدتكم في كل ما يخص وثائق السفر، جواز المرور، المساعدة القانونية السرية، وتسجيل المواليد الجدد. يمكنكم الضغط على زر الواتساب لإرسال رسالة صوتية مباشرة إلى القنصل الفخري دون الحاجة للكتابة.'
        : 'Bienvenue sur l\'application Tadamoun Tchad à Tamanrasset. Cette application est dédiée à vous assister pour les laissez-passer de voyage, les urgences médicales et la déclaration des nouveau-nés. Vous pouvez envoyer un message vocal directement au Consul sur WhatsApp sans savoir écrire.';

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'fr-FR';
      utterance.onend = () => setIsSpeakingText(false);
      utterance.onerror = () => setIsSpeakingText(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeakingText(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/60 to-slate-900 border border-amber-900/40 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{t.title}</h2>
              <p className="text-xs text-amber-200/80">{t.subtitle}</p>
            </div>
          </div>

          <button
            onClick={speakGuide}
            className={`p-3 rounded-2xl border transition flex items-center gap-1.5 text-xs font-bold ${
              isSpeakingText
                ? 'bg-amber-500 text-slate-900 border-amber-400 animate-pulse'
                : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeakingText ? (lang === 'ar' ? 'إيقاف الصوت' : 'Arrêter') : t.readAloud}</span>
          </button>
        </div>
      </div>

      {/* Main Voice Recording Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-6">
        <div className="space-y-2">
          <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
            {t.recordInstruction}
          </p>
          {isRecording && (
            <div className="text-sm font-mono font-bold text-red-400 flex items-center justify-center gap-2 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              {formatTime(recordingSeconds)}
            </div>
          )}
        </div>

        {/* Big Mic Button */}
        <div className="flex justify-center items-center py-2">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition flex flex-col items-center justify-center gap-2 group ring-8 ring-amber-500/20"
            >
              <Mic className="w-10 h-10 group-hover:scale-110 transition" />
              <span className="text-[11px] font-extrabold uppercase tracking-wide">
                {lang === 'ar' ? 'تحدث الآن' : 'Parler'}
              </span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-28 h-28 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 text-white font-black shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition flex flex-col items-center justify-center gap-2 animate-pulse ring-8 ring-red-500/30"
            >
              <Square className="w-8 h-8 fill-current" />
              <span className="text-[11px] font-extrabold uppercase tracking-wide">
                {lang === 'ar' ? 'إنهاء التسجيل' : 'Terminer'}
              </span>
            </button>
          )}
        </div>

        {/* Audio Player if recorded */}
        {audioUrl && (
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between gap-4 max-w-md mx-auto">
            <audio
              ref={audioPlayerRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <button
              onClick={togglePlayback}
              className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow transition hover:bg-amber-400"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <span className="text-xs text-gray-300 font-mono font-medium">
              {lang === 'ar' ? 'تسجيلك الصوتي جاهز للاستماع' : 'Votre message vocal est prêt'}
            </span>
            <span className="text-xs font-mono text-amber-400">{formatTime(recordingSeconds)}</span>
          </div>
        )}

        {/* Quick WhatsApp Voice Transfer */}
        <div className="pt-2 max-w-md mx-auto">
          <a
            href="https://wa.me/213661168561"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-3 transition active:scale-98"
          >
            <MessageCircle className="w-6 h-6" />
            <span>{t.sendViaWhatsApp}</span>
            <Send className="w-4 h-4 rtl:rotate-180" />
          </a>
          <p className="text-[11px] text-gray-400 mt-2 text-center">
            {lang === 'ar'
              ? 'سيفتح تطبيق واتساب برقم القنصل الفخري (+213661168561). اضغط زر الميكروفون داخل واتساب لإرسال رسالتك الصوتية.'
              : 'Ouvre WhatsApp directement avec le Consul (+213661168561). Maintenez le micro dans WhatsApp pour envoyer votre note vocale.'}
          </p>
        </div>
      </div>
    </div>
  );
};
