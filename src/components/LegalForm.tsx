import React, { useState } from 'react';
import { ShieldCheck, Lock, Send, EyeOff, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Language, LegalInquiry } from '../types';
import { translations } from '../translations';

interface LegalFormProps {
  lang: Language;
  onSuccessSave?: (inquiry: LegalInquiry) => void;
}

export const LegalForm: React.FC<LegalFormProps> = ({ lang, onSuccessSave }) => {
  const t = translations[lang].legalSection;
  const [fullName, setFullName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('Tamanrasset');
  const [category, setCategory] = useState<LegalInquiry['category']>('regularization');
  const [description, setDescription] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<LegalInquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newId = `TT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiry: LegalInquiry = {
      id: newId,
      date: new Date().toISOString(),
      fullName: isAnonymous ? (lang === 'ar' ? 'مواطن تشادي (مجهول الهوية)' : 'Ressortissant Tchadien (Anonyme)') : (fullName || (lang === 'ar' ? 'فاعل خير' : 'Bénévole')),
      isAnonymous,
      phone: phone || (lang === 'ar' ? 'غير مصرح' : 'Non précisé'),
      wilaya,
      category,
      description,
      status: 'pending'
    };

    // Save to LocalStorage
    try {
      const existing = localStorage.getItem('tt_legal_inquiries');
      const list: LegalInquiry[] = existing ? JSON.parse(existing) : [];
      list.unshift(inquiry);
      localStorage.setItem('tt_legal_inquiries', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setSubmittedInquiry(inquiry);
    if (onSuccessSave) onSuccessSave(inquiry);

    // Provide vibration feedback if supported
    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
  };

  const getWhatsAppMessageUrl = () => {
    if (!submittedInquiry) return '#';
    const catLabel = t.categories[submittedInquiry.category];
    const text = lang === 'ar'
      ? `🔒 استشارة قانونية / إنسانية سرية (كود: ${submittedInquiry.id})\n` +
        `• الاسم: ${submittedInquiry.fullName}\n` +
        `• المكان: ${submittedInquiry.wilaya}\n` +
        `• الهاتف: ${submittedInquiry.phone}\n` +
        `• التصنيف: ${catLabel}\n` +
        `• التفاصيل: ${submittedInquiry.description}\n` +
        `مرسلة عبر تطبيق تضامن تشاد - تمنراست`
      : `🔒 Consultation Juridique & Protection Confidentielle (Réf: ${submittedInquiry.id})\n` +
        `• Nom: ${submittedInquiry.fullName}\n` +
        `• Ville: ${submittedInquiry.wilaya}\n` +
        `• Contact: ${submittedInquiry.phone}\n` +
        `• Catégorie: ${catLabel}\n` +
        `• Détails: ${submittedInquiry.description}\n` +
        `Transmis via application Tadamoun Tchad - Tamanrasset`;

    return `https://wa.me/213661168561?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setSubmittedInquiry(null);
    setDescription('');
    setFullName('');
    setPhone('');
    setIsAnonymous(false);
  };

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-900/40 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t.title}</h2>
            <p className="text-xs text-indigo-200/80">{t.subtitle}</p>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="mt-3 p-3 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 flex items-start gap-2.5 text-xs text-indigo-200">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{t.confidentialityNotice}</span>
        </div>
      </div>

      {submittedInquiry ? (
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/80 shadow-2xl text-center space-y-4 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-lg font-black text-white mb-1">{t.successMessage}</h3>
            <div className="inline-block px-4 py-2 rounded-2xl bg-slate-800 border border-emerald-500/50 font-mono text-xl font-black text-amber-400 tracking-wider">
              {submittedInquiry.id}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {lang === 'ar'
                ? 'تم حفظ الاستشارة محلياً في هاتفك بأمان، ويمكنك الآن إرسالها مباشرة عبر واتساب إلى القنصل الفخري للمتابعة الفورية.'
                : 'Votre consultation est sauvegardée en sécurité. Vous pouvez maintenant la transmettre directement par WhatsApp au Consul.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition active:scale-98"
            >
              <MessageSquare className="w-5 h-5" />
              {t.sendingWhatsApp}
            </a>

            <button
              onClick={resetForm}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-medium text-xs transition"
            >
              {lang === 'ar' ? 'تقديم استشارة جديدة' : 'Nouvelle consultation'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          {/* Anonymous Mode Switch */}
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <EyeOff className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-gray-200">{t.anonymousMode}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Full Name (if not anonymous) */}
          {!isAnonymous && (
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.fullName}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: إبراهيم آدم موسى' : 'Ex: Ibrahim Adam Moussa'}
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {/* Phone / WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.phone}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06 XX XX XX XX / +213..."
              className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Wilaya / Location */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.wilaya}</label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="Tamanrasset">تمنراست / Tamanrasset</option>
              <option value="In Salah">عين صالح / In Salah</option>
              <option value="In Guezzam">عين قزام / In Guezzam</option>
              <option value="Djanet">جانت / Djanet</option>
              <option value="Bordj Badji Mokhtar">برج باجي مختار / Bordj Badji Mokhtar</option>
              <option value="Adrar">أدرار / Adrar</option>
              <option value="Illizi">إليزي / Illizi</option>
              <option value="Other">منطقة أخرى / Autre région</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.category}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {Object.entries(t.categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.description}</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === 'ar' ? 'اشرح بالتفصيل ما حدث معك، التواريخ، أو المكان...' : 'Décrivez votre situation avec le plus de précisions possibles...'}
              className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-950/60 flex items-center justify-center gap-2 transition active:scale-98"
          >
            <Send className="w-4 h-4" />
            {t.submitBtn}
          </button>
        </form>
      )}
    </div>
  );
};
