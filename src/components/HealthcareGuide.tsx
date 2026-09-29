import React from 'react';
import { HeartPulse, Phone, MapPin, ShieldAlert, Award, Stethoscope } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HealthcareGuideProps {
  lang: Language;
}

export const HealthcareGuide: React.FC<HealthcareGuideProps> = ({ lang }) => {
  const t = translations[lang].healthcareSection;

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/70 to-slate-900 border border-rose-900/40 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t.title}</h2>
            <p className="text-xs text-rose-200/80">{t.subtitle}</p>
          </div>
        </div>

        {/* Legal Right Banner */}
        <div className="mt-3 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 flex items-start gap-2.5 text-xs text-rose-100 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>{t.urgentRight}</span>
        </div>
      </div>

      {/* Rights Key Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-1">
            <Stethoscope className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">
            {lang === 'ar' ? 'المستعجلات الطبية الحيوية' : 'Urgences Vitales'}
          </h4>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {lang === 'ar'
              ? 'العلاج في مصالح الاستعجالات بالمستشفيات العمومية مجاني وإلزامي ولا يجوز رفض أي مريض في حالة حرجة.'
              : 'Tout hôpital public doit prendre en charge gratuitement et immédiatement toute personne en détresse vitale.'}
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-1">
            <Award className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">
            {lang === 'ar' ? 'الولادة ورعاية الأمومة' : 'Maternité & Accouchement'}
          </h4>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {lang === 'ar'
              ? 'تستقبل مصالح الولادة النساء الحوامل للوضع الإسعافي، مع تسليم شهادة الإشعار بالولادة لحماية الرضيع.'
              : 'Accouchement sécurisé assuré pour toute mère avec remise obligatoire du certificat d\'accouchement.'}
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
            <HeartPulse className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">
            {lang === 'ar' ? 'تطعيم الأطفال واللقاحات' : 'Vaccination Infantile'}
          </h4>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {lang === 'ar'
              ? 'الرزنامة الوطنية لتلقيح الأطفال بالعيادات المتعددة الخدمات مجانية ومتاحة لكل الأطفال بدون تمييز.'
              : 'Vaccinations gratuites pour tous les enfants dans les polycliniques sans distinction.'}
          </p>
        </div>
      </div>

      {/* Directory of Hospitals and Humanitarian Points */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-400" />
          {lang === 'ar' ? 'المؤسسات الاستشفائية والإنسانية بتمنراست والجنوب' : 'Établissements & Points Humanitaires'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.hospitals.map((h, i) => (
            <div key={i} className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-amber-400 font-medium mb-2">
                  {h.type}
                </span>
                <h4 className="text-xs font-bold text-white mb-1">{h.name}</h4>
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  {h.address}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="font-mono text-xs text-gray-300 font-bold">{h.phone}</span>
                <a
                  href={`tel:${h.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'اتصال' : 'Appeler'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
