import { useEffect } from 'react';

const SCRIPT_ID = 'vlibras-plugin-script';
const SCRIPT_URL = 'https://vlibras.gov.br/app/vlibras-plugin.js';
const WIDGET_URL = 'https://vlibras.gov.br/app';

export default function VLibras() {
  useEffect(() => {
    function inicializarWidget() {
      if (!window.VLibras?.Widget || window.__vlibrasWidgetInicializado) {
        return;
      }

      new window.VLibras.Widget(WIDGET_URL);
      window.__vlibrasWidgetInicializado = true;
    }

    const scriptExistente = document.getElementById(SCRIPT_ID);
    if (scriptExistente) {
      inicializarWidget();
      scriptExistente.addEventListener('load', inicializarWidget);
      return () => scriptExistente.removeEventListener('load', inicializarWidget);
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;
    script.addEventListener('load', inicializarWidget);
    document.body.appendChild(script);

    return () => script.removeEventListener('load', inicializarWidget);
  }, []);

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
