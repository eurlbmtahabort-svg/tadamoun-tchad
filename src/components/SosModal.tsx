import React, { useState } from 'react';
import { Phone, AlertTriangle, MapPin, X, Send, Siren, ShieldAlert, HeartPulse } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SosModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ lang, isOpen, onClose }) => {
  const t = translations[lang].sosModal;
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGetLocation = () => {
    setGpsLoading(true);
    setGpsError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setGpsLoading(false);
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        },
        () => {
          setGpsLoading(false);
          setGpsError(lang === 'ar' ? 'تعذر جلب إحداثيات GPS يرجى التحقق من تفعيل الموقع.' : 'Impossible de récupérer la position GPS.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setGpsLoading(false);
      setGpsError(lang === 'ar' ? 'جهازك لا يدعم نظام تحديد المواقع.' : 'Géolocalisation non supportée.');
    }
  };

  const getWhatsAppSosUrl = () => {
    let message = lang === 'ar' 
      ? '🚨 نداء استغاثة عاجل (SOS) - الجالية التشادية بالجنوب الجزائري\nأحتاج لمساعدة قنصلية أو إنسانية عاجلة.' 
      : '🚨 ALERTE URGENCE SOS - Communauté Tchadienne Sud Algérien\nJ\'ai besoin d\'une assistance consulaire ou médicale immédiate.';
    
    if (coords) {
      message += `\n📍 موقعي الجغرافي بالصحراء / GPS:\nhttps://maps.google.com/?q=${coords.lat},${coords.lng}`;
    }
    return `https://wa.me/213661168561?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border-2 border-red-600 shadow-2xl p-5 text-white"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-500/30 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/50 animate-pulse">
              <Siren className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-red-400">{t.title}</h3>
              <p className="text-xs text-red-200/80">Hotline: +213 661 16 85 61</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="p-3 mb-4 rounded-xl bg-red-950/70 border border-red-800 flex items-start gap-2.5 text-xs text-red-200">
          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <span>{t.warning}</span>
        </div>

        {/* Direct Call Button (Candidate Consul) */}
        <div className="mb-4">
          <a
            href="tel:+213661168561"
            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold shadow-lg shadow-red-900/40 active:scale-98 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div className="text-right">
                <span className="block text-xs uppercase tracking-wider text-red-200">{t.consulDirect}</span>
                <span className="text-lg font-mono tracking-wider font-extrabold">+213 661 16 85 61</span>
              </div>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-white/20 font-medium">24/7</span>
          </a>
        </div>

        {/* WhatsApp SOS with GPS */}
        <div className="p-4 mb-4 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {t.gpsCoords}
            </span>
            <button
              onClick={handleGetLocation}
              disabled={gpsLoading}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium transition flex items-center gap-1.5"
            >
              {gpsLoading ? t.gettingGps : (coords ? '✓ تم التحديد' : 'تحديد الموقع GPS')}
            </button>
          </div>

          {coords && (
            <div className="p-2 mb-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 font-mono text-xs text-emerald-300 text-center">
              LAT: {coords.lat.toFixed(5)} | LNG: {coords.lng.toFixed(5)}
            </div>
          )}

          {gpsError && (
            <div className="p-2 mb-3 rounded-lg bg-yellow-950/40 text-xs text-yellow-300">
              {gpsError}
            </div>
          )}

          <a
            href={getWhatsAppSosUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white shadow-md shadow-emerald-900/40 active:scale-98 transition"
          >
            <Send className="w-4 h-4" />
            {t.sendGpsWhatsapp}
          </a>
        </div>

        {/* Official Algerian Emergency Services Numbers */}
        <div className="space-y-2 mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {lang === 'ar' ? 'أرقام الطوارئ الرسمية بالجزائر' : 'Numéros d\'urgence officiels en Algérie'}
          </p>

          <a
            href="tel:14"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 transition border border-slate-700/60 text-sm"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{t.civilProtection}</span>
            </div>
            <span className="font-mono font-bold text-amber-400 text-base">14</span>
          </a>

          <a
            href="tel:17"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 transition border border-slate-700/60 text-sm"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
              <span>{t.police}</span>
            </div>
            <span className="font-mono font-bold text-blue-400 text-base">17 / 1548</span>
          </a>

          <a
            href="tel:3015"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 transition border border-slate-700/60 text-sm"
          >
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>{t.samu}</span>
            </div>
            <span className="font-mono font-bold text-rose-400 text-base">3015</span>
          </a>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-medium text-sm transition"
        >
          {lang === 'ar' ? 'إغلاق نافذة الطوارئ' : 'Fermer le menu SOS'}
        </button>
      </div>
    </div>
  );
};
