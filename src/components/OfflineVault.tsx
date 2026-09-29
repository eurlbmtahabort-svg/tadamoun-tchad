import React, { useState, useEffect } from 'react';
import { Database, Copy, Check, Trash2, Calendar, FileText, Baby, Shield, ExternalLink } from 'lucide-react';
import { Language, LegalInquiry, NewbornRegistration } from '../types';
import { translations } from '../translations';

interface OfflineVaultProps {
  lang: Language;
}

export const OfflineVault: React.FC<OfflineVaultProps> = ({ lang }) => {
  const t = translations[lang].offlineVault;
  const [legalList, setLegalList] = useState<LegalInquiry[]>([]);
  const [newbornList, setNewbornList] = useState<NewbornRegistration[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const legals = localStorage.getItem('tt_legal_inquiries');
      if (legals) setLegalList(JSON.parse(legals));

      const babies = localStorage.getItem('tt_newborns');
      if (babies) setNewbornList(JSON.parse(babies));
    } catch (e) {
      console.error(e);
    }
  };

  const clearData = () => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من مسح جميع السجلات المحفوظة محلياً؟' : 'Supprimer toutes les déclarations locales ?')) {
      localStorage.removeItem('tt_legal_inquiries');
      localStorage.removeItem('tt_newborns');
      localStorage.removeItem('tt_checked_docs');
      setLegalList([]);
      setNewbornList([]);
    }
  };

  const copyApkHtmlSource = () => {
    // Generate or fetch the current index.html content
    const htmlContent = document.documentElement.outerHTML;
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    });
  };

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t.title}</h2>
            <p className="text-xs text-gray-300">{t.subtitle}</p>
          </div>
        </div>

        {(legalList.length > 0 || newbornList.length > 0) && (
          <button
            onClick={clearData}
            className="p-2 rounded-xl bg-red-950/60 border border-red-800 text-red-300 hover:text-white hover:bg-red-900 transition"
            title="Effacer l'historique local"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* APK Web2APK Export Notice */}
      <div className="p-4 rounded-3xl bg-blue-950/40 border border-blue-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">
              {lang === 'ar' ? 'تجهيز حزمة تطبيق أندرويد (Web2APK)' : 'Export pour Packaging Android APK'}
            </h4>
            <p className="text-[11px] text-blue-200/80 leading-relaxed">
              {lang === 'ar'
                ? 'التطبيق جاهز 100% للتحويل إلى ملف APK عبر Web2APK أو WebView بدون تعديل.'
                : 'L\'application est 100% optimisée pour le packaging Web2APK / Android WebView en fichier unique.'}
            </p>
          </div>
        </div>

        <button
          onClick={copyApkHtmlSource}
          className="shrink-0 px-4 py-2.5 rounded-2xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow"
        >
          {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedCode ? t.exportSuccess : t.exportCode}</span>
        </button>
      </div>

      {/* Saved Newborns */}
      {newbornList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Baby className="w-4 h-4" />
            {lang === 'ar' ? 'سجلات المواليد المسجلة محلياً' : 'Déclarations de Naissance Sauvegardées'}
          </h3>

          <div className="space-y-2">
            {newbornList.map((baby) => (
              <div
                key={baby.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-400">{baby.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {baby.gender === 'male' ? (lang === 'ar' ? 'ذكر' : 'Garçon') : (lang === 'ar' ? 'أنثى' : 'Fille')}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{baby.childName}</h4>
                  <p className="text-[11px] text-gray-400">
                    {baby.birthDate} - {baby.birthPlace}
                  </p>
                </div>

                <a
                  href={`https://wa.me/213661168561?text=${encodeURIComponent(
                    `Re-transmission Acte Naissance: ${baby.id} - ${baby.childName} - ${baby.phone}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition"
                  title="WhatsApp"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Consultations */}
      {legalList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {lang === 'ar' ? 'الاستشارات القانونية المحفوظة' : 'Consultations Juridiques Sauvegardées'}
          </h3>

          <div className="space-y-2">
            {legalList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-400">{item.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {item.wilaya}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.fullName}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">{item.description}</p>
                </div>

                <a
                  href={`https://wa.me/213661168561?text=${encodeURIComponent(
                    `Suivi Consultation: ${item.id} - ${item.fullName}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {legalList.length === 0 && newbornList.length === 0 && (
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
          <Calendar className="w-8 h-8 text-gray-600 mx-auto" />
          <p className="text-xs text-gray-400">{t.empty}</p>
        </div>
      )}
    </div>
  );
};
