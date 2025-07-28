// src/app/shared/terms-modal/terms-modal.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Términos y Condiciones</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
      <div>
        ¡Bienvenido a ADEL, la Alianza Digital El Encantado!
        <br>
        Estos Términos y Condiciones (en adelante, "Términos") rigen el uso de la aplicación ADEL por parte de los emprendedores de la comunidad de El Encantado. Al registrarte y utilizar nuestra plataforma, aceptas cumplir con estos Términos. Te invitamos a leerlos detenidamente.
        <br>
        <b>1. Elegibilidad y Registro</b>
        Para registrarte como emprendedor en ADEL, debes ser mayor de edad, residir en la comunidad de El Encantado y contar con una actividad comercial legalmente establecida o en vías de formalización. El proceso de registro requiere la provisión de información veraz y completa, incluyendo datos personales, información de contacto y detalles de tu negocio. Nos reservamos el derecho de verificar la elegibilidad de cualquier solicitante.
        <br>
        <b>2. Cuentas de Usuario</b>
        Eres responsable de mantener la confidencialidad de tu información de cuenta y contraseña. Cualquier actividad que ocurra bajo tu cuenta será de tu exclusiva responsabilidad. Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.
        <br>
        <b>3. Derechos y Responsabilidades del Emprendedor</b>
        Como emprendedor en ADEL, te comprometes a:
        Ofrecer productos y/o servicios de calidad, tal como los describes.
        Cumplir con los plazos de entrega y las condiciones acordadas con los compradores.
        Mantener tu información de productos, precios y disponibilidad actualizada.
        Interactuar de manera respetuosa y profesional con otros usuarios y administradores.
        Cumplir con todas las leyes y regulaciones aplicables a tu actividad comercial.
        <br>
        <b>4. Contenido Generado por el Usuario y Conducta</b>
        Eres el único responsable del contenido (descripciones de productos, imágenes, promociones, etc.) que publiques en la plataforma. Este contenido debe ser exacto, veraz y no debe infringir derechos de terceros ni ser ofensivo, ilegal o engañoso. Nos reservamos el derecho de eliminar o modificar contenido que infrinja estos términos.
        <br>
        <b>5. Propiedad Intelectual y Derechos de Autor</b>
        Al subir contenido a ADEL, declaras que tienes los derechos necesarios sobre dicho contenido o que has obtenido las licencias pertinentes. Concedes a ADEL una licencia limitada, no exclusiva y mundial para usar, reproducir, modificar, publicar y distribuir tu contenido dentro de la plataforma, con el fin de operar y promover el servicio. Tus derechos de propiedad intelectual sobre tu contenido permanecen tuyos.
        <br>
        <b>6. Métodos de Pago y Proceso de Entrega</b>
        ADEL facilita el procesamiento de pagos de tus clientes a través de la plataforma. Los métodos de pago disponibles son: PayPal, transferencia bancaria, pago móvil y efectivo. Una vez que el cliente realiza un pago a través de la plataforma, el administrador de ADEL validará la recepción y confirmará al emprendedor. La gestión de la entrega de los productos sigue siendo responsabilidad directa del emprendedor y el comprador.
        <br>
        <b>7. Pagos y Comisiones</b>
        Centralización del Pago: Todos los pagos realizados por los compradores a través de los métodos habilitados en la plataforma serán recibidos y gestionados inicialmente por el administrador de ADEL.
        Transferencia al Emprendedor: Los fondos correspondientes a las ventas que realices serán transferidos a tu cuenta el siguiente día hábil posterior a la confirmación de la operación por parte del administrador.
        Comisiones: Actualmente, ADEL no aplica comisiones directas sobre las ventas realizadas. En caso de que se implemente algún esquema de tarifas o comisiones en el futuro, los emprendedores serán notificados con antelación y se requerirá su consentimiento explícito para la continuidad del servicio bajo las nuevas condiciones.facilitador de la conexión, no como intermediario directo en la transacción financiera o logística, a menos que se implementen funcionalidades futuras que especifiquen lo contrario.
        <br>
        <b>8. Cancelaciones y Devoluciones</b>
        Las políticas de cancelación y devolución de productos o servicios serán responsabilidad de cada emprendedor. Te recomendamos establecer y comunicar claramente tus propias políticas a tus compradores. ADEL podrá facilitar la comunicación entre las partes en caso de disputas relacionadas, pero no será responsable de la ejecución de dichas políticas.
        <br>
        <b>9. Privacidad y Protección de Datos</b>
        Tu privacidad es fundamental. Nos comprometemos a proteger tus datos personales de acuerdo con nuestra Política de Privacidad, que forma parte integral de estos Términos. Al utilizar ADEL, consientes la recopilación, uso y tratamiento de tus datos personales tal como se describe en dicha Política, la cual cumple con los principios del Reglamento General de Protección de Datos (RGPD).
        <br>
        <b>10. Terminación de la Cuenta</b>
        Podemos suspender o terminar tu cuenta de emprendedor en ADEL si incumples gravemente estos Términos, si tu conducta es perjudicial para la comunidad o si realizas actividades fraudulentas o ilegales. También puedes solicitar la terminación de tu cuenta en cualquier momento.
        <br>
        <b>11. Limitación de Responsabilidad</b>
        ADEL es una plataforma que facilita la conexión entre emprendedores y compradores. No somos responsables de la calidad, legalidad o seguridad de los productos o servicios ofrecidos por los emprendedores. No garantizamos que la plataforma estará libre de errores o interrupciones, aunque nos esforzamos por mantener un servicio óptimo. En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuenciales derivados del uso o la imposibilidad de uso de la plataforma.
        <br>
        <b>12. Garantías</b>
        La plataforma ADEL se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo, entre otras, garantías de comerciabilidad, idoneidad para un fin particular o no infracción.
        <br>
        <b>13. Indemnización</b>
        Aceptas indemnizarnos, defendernos y eximirnos de cualquier reclamación, responsabilidad, daño, pérdida y gasto, incluyendo honorarios de abogados, que surjan de o estén relacionados con tu uso de la plataforma, tu contenido o tu incumplimiento de estos Términos.
        <br>
        <b>14. Fuerza Mayor</b>
        No seremos responsables de ningún retraso o incumplimiento de nuestras obligaciones bajo estos Términos si dicho retraso o incumplimiento es causado por eventos fuera de nuestro control razonable, como desastres naturales, actos de terrorismo, guerra, interrupciones de internet o fallas de equipos.
        <br>
        <b>15. Notificaciones</b>
        Todas las notificaciones y comunicaciones bajo estos Términos se realizarán por vía electrónica, a través de la plataforma o al correo electrónico asociado a tu cuenta.
        <br>
        <b>16. Modificaciones de los Términos y Condiciones</b>
        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Te notificaremos sobre cualquier cambio significativo a través de la plataforma o por correo electrónico. El uso continuado de ADEL después de dichas modificaciones constituye tu aceptación de los nuevos Términos.
        <br/>
        <b>17. Mecanismo de Resolución de Disputas</b>
        Cualquier disputa que surja en relación con estos Términos o el uso de la plataforma se intentará resolver de buena fe entre las partes. Si no se llega a un acuerdo, las partes acuerdan someter la disputa a los tribunales competentes en la jurisdicción aplicable.
        <br>
        <b>18. Ley Aplicable y Jurisdicción</b>
        Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República Bolivariana de Venezuela, sin dar efecto a ningún principio de conflicto de leyes. Cualquier disputa que surja en virtud de estos Términos se someterá a la jurisdicción exclusiva de los tribunales de Caracas, Venezuela.
        <br>
        <b>19. Confidencialidad</b>
        Ambas partes acuerdan mantener la confidencialidad de la información confidencial compartida en el marco del uso de la plataforma, excepto cuando sea requerido por ley.
        <br>
        <b>20. Acuerdo Completo</b>
        Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre tú y ADEL en relación con el uso de la plataforma por parte de los emprendedores, y reemplazan cualquier acuerdo o comunicación anterior.
        <br>
        <b>21. Renuncia</b>
        Nuestra inacción o retraso en ejercer cualquier derecho o disposición de estos Términos no constituirá una renuncia a dicho derecho o disposición.
        <br>
        <b>22. Divisibilidad</b>
        Si alguna disposición de estos Términos es considerada inválida o inaplicable por un tribunal, las demás disposiciones de estos Términos permanecerán en pleno vigor y efecto.
        <br>
        <b>23. Títulos</b>
        Los títulos de las secciones en estos Términos son solo por conveniencia y no afectarán la interpretación de los mismos.
        <br>
        <b>24. Vigencia</b>
        Estos Términos entran en vigencia a partir de la fecha de tu registro en la plataforma y permanecerán vigentes hasta que tu cuenta sea terminada.
        <br>
        <b>25. Idioma</b>
        La versión oficial de estos Términos es en español. Cualquier traducción se proporciona únicamente para conveniencia.
        <br>
        <b>26. Información de Contacto</b>
        Si tienes alguna pregunta sobre estos Términos, por favor contáctanos a través de [Correo Electrónico de Contacto de ADEL] o a través de nuestra plataforma.
        <br>
        <strong>Al hacer  aceptar o al utilizar la plataforma ADEL, confirmas que has leído, entendido y aceptado estos Términos y Condiciones.</strong>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close()">Cerrar</button>
    </div>
  `
})
export class TermsModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}



