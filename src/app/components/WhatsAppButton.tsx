import { MessageCircle } from 'lucide-react';
import { business, whatsappUrl } from '../data/business';

/**
 * Botón flotante de WhatsApp: es la vía de contacto que más usan los clientes
 * del barrio y la política de privacidad ya la contempla.
 */
export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${business.phoneDisplay}`}
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="whatsapp-fab-text">WhatsApp</span>
    </a>
  );
}
