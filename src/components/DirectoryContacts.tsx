import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Award, ShieldAlert, HeartHandshake } from 'lucide-react';
import { Language } from '../types';

interface DirectoryContactsProps {
  lang: Language;
}

export const DirectoryContacts: React.FC<DirectoryContactsProps> = ({ lang }) => {
  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Candidate Honorary Consul Mission & Office Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#002654] via-[#021b3d] to-slate-900 border-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
        {/* Decorative corner tag */}
        <div className="absolute top-0 end-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
          {lang === 'ar' ? 'القنصلية الفخرية' : 'Consulat Honoraire'}
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] text-amber-300 font-bold block uppercase tracking-wider">
              {lang === 'ar' ? 'مرشح منصب القنصل الفخري لجمهورية تشاد' : 'Candidat au Poste de Consul Honoraire du Tchad'}
            </span>
            <h3 className="text-lg font-black text-white">
              {lang === 'ar' ? 'المكتب القنصلي المؤقت بتمنراست' : 'Bureau Consulaire de Proximité - Tamanrasset'}
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              {lang === 'ar'
                ? 'تغطية ولايات: تمنراست، عين صالح، عين قزام، جانت، برج باجي مختار، إليزي، أدرار.'
                : 'Couverture: Tamanrasset, In Salah, In Guezzam, Djanet, Bordj Badji Mokhtar, Illizi, Adrar.'}
            </p>
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-blue-900/60 text-xs">
          <div className="flex items-center gap-3 text-gray-200">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-mono font-bold text-white text-sm">+213 661 16 85 61</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
              24/7 Hotline
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-200">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp:</span>
            <a
              href="https://wa.me/213661168561"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline font-mono font-medium"
            >
              wa.me/213661168561
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-200">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {lang === 'ar' ? 'تمنراست - وسط المدينة والحي الإداري' : 'Tamanrasset - Centre-ville & Quartier Administratif'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-200">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              {lang === 'ar' ? 'استقبال الحالات المستعجلة: طوال أيام الأسبوع 24/24' : 'Urgences et Permanence: 7j/7 - 24h/24'}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href="tel:+213661168561"
            className="py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs text-center shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Phone className="w-4 h-4" />
            {lang === 'ar' ? 'اتصال مباشر' : 'Appel Direct'}
          </a>

          <a
            href="https://wa.me/213661168561"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Diplomatic & Institutional Addresses */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {lang === 'ar' ? 'المؤسسات الرسمية ذات الصلة' : 'Institutions & Partenaires'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <HeartHandshake className="w-4 h-4" />
              <h5 className="text-xs font-bold text-white">
                {lang === 'ar' ? 'سفارة جمهورية تشاد بالجزائر العاصمة' : 'Ambassade de la République du Tchad - Alger'}
              </h5>
            </div>
            <p className="text-[11px] text-gray-400">
              {lang === 'ar'
                ? 'التنسيق المباشر لإصدار الجوازات البيومترية والمصادقة على الوثائق العليا.'
                : 'Coordination officielle pour les passeports biométriques et visas diplomatiques.'}
            </p>
            <div className="text-[11px] font-mono text-gray-300">Hydra / Alger-Centre</div>
          </div>

          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <h5 className="text-xs font-bold text-white">
                {lang === 'ar' ? 'الهلال الأحمر الجزائري - تمنراست' : 'Croissant-Rouge Algérien - Tamanrasset'}
              </h5>
            </div>
            <p className="text-[11px] text-gray-400">
              {lang === 'ar'
                ? 'الإعانة الغذائية، الإيواء الاستعجالي، الرعاية الصحية والمساعدات الشتوية.'
                : 'Aide humanitaire d\'urgence, kits d\'hygiène, colis alimentaires et abri.'}
            </p>
            <div className="text-[11px] font-mono text-gray-300">Tél: 029 32 18 19</div>
          </div>
        </div>
      </div>
    </div>
  );
};
