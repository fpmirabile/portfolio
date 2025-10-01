import { getCurrentLanguage } from "./language";

export function downloadCV() {
  const currentLanguage = getCurrentLanguage();
  const cvUrl = `${window.location.origin}/Fernando_Mirabile_resume.pdf`;

  try {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Fernando_Mirabile_resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const messages: Record<string, string> = {
      es: "CV no disponible en este momento. Por favor, contacta por email.",
      en: "CV not available at the moment. Please contact via email.",
      pt: "CV não disponível no momento. Por favor, entre em contato por e-mail.",
    };
    alert(messages[currentLanguage] || messages.en);
  }
}
