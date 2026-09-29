import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, Clock, DollarSign, Calendar, AlertCircle, Share2, Check } from 'lucide-react';
import { Language, ConsularDocumentItem } from '../types';
import { translations } from '../translations';

interface AdminGuidanceProps {
  lang: Language;
}

const consularDocs: ConsularDocumentItem[] = [
  {
    id: 'laissez_passer',
    category: 'laissez_passer',
    titleAr: 'جواز المرور القنصلي (Laissez-Passer)',
    titleFr: 'Laissez-Passer Consulaire de Voyage',
    descriptionAr: 'وثيقة سفر اضطرارية تصدر للأشخاص الفاقدين لوثائقهم أو المنتهية صلاحيتها للعودة الطارئة والآمنة إلى تشاد.',
    descriptionFr: 'Titre de voyage d\'urgence délivré aux ressortissants tchadiens sans passeport valide pour un retour direct au Tchad.',
    requirementsAr: [
      'صورة طبق الأصل من جواز السفر المنتهي أو بطاقة الهوية التشادية (أو شهادة ميلاد)',
      'صورتان شمسيتان بيومتريتان حديثتان بخلفية بيضاء',
      'تصريح ضياع أو سرقة صادر من مصالح الشرطة الجزائرية (في حال الفقدان)',
      'تذكرة سفر مؤكدة للعودة (براً أو جواً) أو تحديد تاريخ المغادرة',
      'حضور المعني شخصياً أو تمثيله من طرف ولي الأمر للقصر'
    ],
    requirementsFr: [
      'Copie de l\'ancien passeport, de la carte d\'identité nationale tchadienne ou acte de naissance',
      'Deux (2) photos d\'identité récentes sur fond blanc',
      'Déclaration de perte ou de vol délivrée par la police algérienne (si applicable)',
      'Justificatif de voyage retour (billet, réservation ou itinéraire)',
      'Comparution physique de l\'intéressé ou du tuteur légal'
    ],
    processingTimeAr: 'من 24 إلى 48 ساعة (نفس اليوم في الحالات الإنسانية العاجلة)',
    processingTimeFr: '24 à 48 heures (Délivrance jour-même pour urgences médicales)',
    validityAr: 'صالح لمدة 30 يوماً لرحلة واحدة مباشرة نحو تشاد',
    validityFr: '30 jours pour un aller simple direct vers le Tchad',
    costAr: 'رسوم رمزية ميسرة (إعفاء تام للحالات المعوزة والمرحلين إنسانياً)',
    costFr: 'Frais réduits (Exonération totale pour cas vulnérables / indigents)',
    urgentNoteAr: '⚡ تنبيه خاص: القنصلية الفخرية توفر خدمة سريعة بالتنسيق مع السلطات الجزائرية في تمنراست وعين قزام.',
    urgentNoteFr: '⚡ Remarque: Assistance prioritaire coordonnée avec les autorités locales à Tamanrasset et In Guezzam.'
  },
  {
    id: 'passport',
    category: 'passport',
    titleAr: 'طلب / تجديد جواز السفر البيومتري',
    titleFr: 'Demande & Renouvellement de Passeport Biométrique',
    descriptionAr: 'تسجيل طلبات الحصول على جواز السفر البيومتري التشادي وتسهيل استلامه في تمنراست بدون الحاجة للسفر إلى العاصمة الجزائر.',
    descriptionFr: 'Enrôlement et acheminement du passeport biométrique tchadien pour la diaspora du Sud algérien.',
    requirementsAr: [
      'شهادة الميلاد المؤمنة (Acte de Naissance Sécurisé / NINA)',
      'الجواز القديم المنتهي الصلاحية مع نسختين منه',
      'بطاقة التسجيل القنصلي بتمنراست أو إثبات الإقامة',
      'أربع (4) صور شمسية بالمقاييس البيومترية',
      'ملء استمارة الطلب الرسمية للقنصلية'
    ],
    requirementsFr: [
      'Acte de naissance sécurisé / NINA tchadien',
      'Ancien passeport expiré + copies',
      'Carte d\'immatriculation consulaire de Tamanrasset',
      '4 photos d\'identité biométriques récentes',
      'Formulaire officiel dûment renseigné'
    ],
    processingTimeAr: 'من 2 إلى 4 أسابيع بالتنسيق مع البعثة القنصلية والسفارة',
    processingTimeFr: '2 à 4 semaines en coordination avec l\'Ambassade',
    validityAr: '5 سنوات كاملة لجميع الوجهات الدولية',
    validityFr: '5 ans pour toutes destinations internationales',
    costAr: 'وفق التعريفة القنصلية الرسمية المصادق عليها',
    costFr: 'Tarif officiel de la chancellerie consulaire',
    urgentNoteAr: 'يمكن طلب شهادة تمديد مؤقتة في الحالات المستعجلة ريثما يصل الجواز الجديد.',
    urgentNoteFr: 'Attestation de prorogation possible en cas d\'extrême urgence.'
  },
  {
    id: 'immatriculation',
    category: 'immatriculation',
    titleAr: 'بطاقة التسجيل القنصلي (Immatriculation)',
    titleFr: 'Carte d\'Immatriculation Consulaire',
    descriptionAr: 'البطاقة الأساسية التي تثبت صفتك كمواطن تشادي مقيم وتمنحك الحماية القنصلية الكاملة والمساعدة في الجنوب.',
    descriptionFr: 'Document d\'identité consulaire fondamental conférant la protection de l\'État tchadien à l\'étranger.',
    requirementsAr: [
      'إثبات الهوية التشادية (جواز سفر، بطاقة تعريف، أو شهادة جنسية)',
      'إثبات التواجد أو السكن في تمنراست أو إحدى ولايات الجنوب',
      'صورتان شخصيتان حديثتان',
      'استمارة معلومات الأسرة'
    ],
    requirementsFr: [
      'Preuve de nationalité tchadienne (passeport, CNI, certificat de nationalité)',
      'Justificatif de domicile ou présence dans le Sud algérien',
      '2 photos d\'identité récentes',
      'Fiche de renseignements familiaux'
    ],
    processingTimeAr: 'تسليم فوري في نفس اليوم',
    processingTimeFr: 'Délivrance immédiate le jour-même',
    validityAr: '3 سنوات قابلة للتجديد بسهولة',
    validityFr: '3 ans renouvelables',
    costAr: 'مجاني أو رسوم بطاقة رمزية',
    costFr: 'Gratuit ou contribution symbolique',
    urgentNoteAr: 'ضرورية لتسهيل جميع المعاملات وتجنب التعقيدات الإدارية في الحواجز الأمنية.',
    urgentNoteFr: 'Fortement recommandée pour sécuriser vos déplacements dans la région.'
  },
  {
    id: 'loss_theft',
    category: 'loss_theft',
    titleAr: 'تصريح بفقدان أو حجز وثائق الهوية',
    titleFr: 'Déclaration de Perte ou Confiscation de Papiers',
    descriptionAr: 'إجراءات استخراج شهادة إثبات هوية قنصلية بديلة لمن فقد جوازه أو تعرض للاحتجاز أو الضياع في الصحراء.',
    descriptionFr: 'Procédure pour déclaration de documents égarés, volés ou retenus, avec attestation de remplacement.',
    requirementsAr: [
      'محضر إيداع شكوى من مفوضية الشرطة أو الدرك الوطني الجزائري',
      'أي وثيقة مساندة (نسخة هاتفية، شهادة ميلاد، شاهدان من الجالية التشادية المسجلين)',
      'صورتان شخصيتان'
    ],
    requirementsFr: [
      'Récépissé de déclaration auprès de la Police ou Gendarmerie algérienne',
      'Tout élément de preuve (photo sur smartphone, témoins tchadiens immatriculés)',
      '2 photos d\'identité'
    ],
    processingTimeAr: 'تسليم في غضون 24 ساعة',
    processingTimeFr: '24 heures maximum',
    validityAr: 'صالح كإثبات مؤقت لمدة 60 يوماً',
    validityFr: 'Valable 60 jours comme attestation provisoire',
    costAr: 'مجاني تماماً',
    costFr: 'Totalement gratuit',
    urgentNoteAr: 'توفر القنصلية مرافقة ميدانية للحالات التي تحتاج تدخلاً لدى المصالح الأمنية.',
    urgentNoteFr: 'Assistance consulaire sur place auprès des services de sécurité.'
  }
];

export const AdminGuidance: React.FC<AdminGuidanceProps> = ({ lang }) => {
  const t = translations[lang].laissezPasserSection;
  const [activeCategory, setActiveCategory] = useState<string>('laissez_passer');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('tt_checked_docs');
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleCheck = (itemKey: string) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      localStorage.setItem('tt_checked_docs', JSON.stringify(updated));
      return updated;
    });
  };

  const currentDoc = consularDocs.find(d => d.category === activeCategory) || consularDocs[0];
  const reqs = lang === 'ar' ? currentDoc.requirementsAr : currentDoc.requirementsFr;

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Title Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900 border border-blue-900/40 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t.title}</h2>
            <p className="text-xs text-blue-200/80">{t.subtitle}</p>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>{t.emergencyNotice}</span>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {consularDocs.map(doc => {
          const isActive = doc.category === activeCategory;
          const title = lang === 'ar' ? doc.titleAr : doc.titleFr;
          return (
            <button
              key={doc.id}
              onClick={() => setActiveCategory(doc.category)}
              className={`p-3 rounded-2xl text-xs font-bold text-center transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-950/60 ring-2 ring-amber-400'
                  : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>

      {/* Main Document Details Card */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
        <div>
          <h3 className="text-lg font-black text-amber-400 mb-1">
            {lang === 'ar' ? currentDoc.titleAr : currentDoc.titleFr}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            {lang === 'ar' ? currentDoc.descriptionAr : currentDoc.descriptionFr}
          </p>
        </div>

        {/* Quick Specs (Validity, Time, Cost) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <span className="block text-[10px] text-gray-400">{t.validity}</span>
              <span className="text-xs font-bold text-white">
                {lang === 'ar' ? currentDoc.validityAr : currentDoc.validityFr}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="block text-[10px] text-gray-400">{t.processingTime}</span>
              <span className="text-xs font-bold text-white">
                {lang === 'ar' ? currentDoc.processingTimeAr : currentDoc.processingTimeFr}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="block text-[10px] text-gray-400">{t.fee}</span>
              <span className="text-xs font-bold text-white">
                {lang === 'ar' ? currentDoc.costAr : currentDoc.costFr}
              </span>
            </div>
          </div>
        </div>

        {/* Urgent Note if any */}
        {(currentDoc.urgentNoteAr || currentDoc.urgentNoteFr) && (
          <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-800/80 text-xs text-blue-200">
            {lang === 'ar' ? currentDoc.urgentNoteAr : currentDoc.urgentNoteFr}
          </div>
        )}

        {/* Interactive Checklist */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {t.checklistTitle}
            </h4>
            <span className="text-[11px] text-gray-400">
              {reqs.filter((_, idx) => checkedItems[`${activeCategory}_${idx}`]).length} / {reqs.length}
            </span>
          </div>

          <div className="space-y-2">
            {reqs.map((req, idx) => {
              const itemKey = `${activeCategory}_${idx}`;
              const isChecked = !!checkedItems[itemKey];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(itemKey)}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-700/80 text-emerald-200'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600 text-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                    isChecked ? 'bg-emerald-500 text-white' : 'border border-gray-500 bg-slate-900'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs select-none leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {req}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Action for this Document */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+213661168561"
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold text-center shadow-lg transition active:scale-98"
          >
            {lang === 'ar' ? 'طلب موعد أو استفسار عاجل (+213 661 16 85 61)' : 'Prendre rendez-vous (+213 661 16 85 61)'}
          </a>

          <a
            href={`https://wa.me/213661168561?text=${encodeURIComponent(
              lang === 'ar' 
                ? `السلام عليكم، استفسار بشأن ${currentDoc.titleAr} في تمنراست.`
                : `Bonjour, demande de renseignements concernant ${currentDoc.titleFr} à Tamanrasset.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold text-center shadow-lg transition flex items-center justify-center gap-2 active:scale-98"
          >
            <Share2 className="w-4 h-4" />
            {lang === 'ar' ? 'إرسال الوثائق عبر واتساب' : 'Envoyer pièces par WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  );
};
