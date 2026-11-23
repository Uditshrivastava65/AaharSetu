export interface ProjectDocument {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  description: string;
  descriptionHi: string;
  url: string;
  filename: string;
  pages: number;
  tag: string;
}

export const PROJECT_DOCUMENTS: ProjectDocument[] = [
  {
    id: 'explainer-distribution',
    title: 'AaharSetu Project Explainer (Distribution Edition)',
    titleHi: 'आहारसेतु परियोजना विवरण पुस्तिका (वितरण संस्करण)',
    subtitle: 'Full Concept Brief & Page 8 Project Note · 8 Pages',
    subtitleHi: 'पूर्ण अवधारणा विवरण एवं परियोजना नोट · 8 पृष्ठ',
    description:
      'Complete institutional explainer covering AaharSetu’s citizen-transparency mission, UFBI architecture, compliance governance, and formal Project Note on status and professional use.',
    descriptionHi:
      'आहारसेतु के नागरिक-पारदर्शिता मिशन, UFBI संरचना, अनुपालन व्यवस्था और परियोजना की स्थिति व उपयोग पर आधिकारिक विवरण।',
    url: '/assets/aistudio/AaharSetu_Project_Explainer_Distribution_Version_49a344fc.pdf',
    filename: 'AaharSetu_Project_Explainer_Distribution_Version.pdf',
    pages: 8,
    tag: 'EDITION · 8 PAGES',
  },
  {
    id: 'explainer-core',
    title: 'AaharSetu Project Explainer (Core Brief)',
    titleHi: 'आहारसेतु परियोजना विवरण पुस्तिका (मूल संक्षिप्त संस्करण)',
    subtitle: 'Architectural & Civic Concept Overview · 7 Pages',
    subtitleHi: 'संरचनात्मक एवं नागरिक अवधारणा अवलोकन · 7 पृष्ठ',
    description:
      'Focused concept briefing detailing the transparency bridge between diners, food businesses, and municipal/food-safety authorities without commercial bias.',
    descriptionHi:
      'नागरिकों, खाद्य व्यवसायों और खाद्य-सुरक्षा प्राधिकरणों के बीच गैर-व्यावसायिक पारदर्शिता सेतु का संक्षिप्त विवरण।',
    url: '/assets/aistudio/AaharSetu_Project_Explainer_3d086777.pdf',
    filename: 'AaharSetu_Project_Explainer.pdf',
    pages: 7,
    tag: 'BRIEF · 7 PAGES',
  },
];

export const CREATOR_INFO = {
  name: 'Udit Shrivastava',
  nameHi: 'उदित श्रीवास्तव',
  role: 'Idea Man, Concept Proposer & Prototype Author',
  roleHi: 'विचारक (Idea Man), अवधारणा प्रस्तावक एवं प्रोटोटाइप निर्माता',
  education: 'B.Tech, Computer Science & Engineering (Data Science)',
  educationHi: 'बी.टेक, कंप्यूटर विज्ञान एवं अभियांत्रिकी (डेटा साइंस)',
  location: 'Jabalpur, Madhya Pradesh, India',
  locationHi: 'जबलपुर, मध्य प्रदेश, भारत',
  email: 'uditshrivastava9977@gmail.com',
  phone: '+91 8839918514',
  foundingQuestion:
    '“Before eating at a food business, how easily can an ordinary citizen understand whether relevant verification and inspection information is available?”',
  foundingQuestionHi:
    '“किसी भी खाद्य प्रतिष्ठान पर भोजन करने से पहले, एक आम नागरिक कितनी आसानी से यह समझ सकता है कि संबंधित सत्यापन और निरीक्षण की जानकारी उपलब्ध है या नहीं?”',
  bio: 'Udit Shrivastava is the idea man behind AaharSetu—conceiving the Universal Food Business ID (UFBI) transparency layer as an independent civic-tech initiative in Jabalpur so citizens, food businesses, and public authorities can verify dining safety before every meal.',
  bioHi:
    'उदित श्रीवास्तव आहारसेतु के विचारक (Idea Man) हैं—जिन्होंने जबलपुर से एक स्वतंत्र सिविक-टेक पहल के रूप में यूनिवर्सल फ़ूड बिज़नेस आईडी (UFBI) पारदर्शिता ढाँचे की परिकल्पना की, ताकि हर भोजन से पहले नागरिक, व्यवसायी और प्रशासन भरोसेमंद सुरक्षा जानकारी सत्यापित कर सकें।',
};
