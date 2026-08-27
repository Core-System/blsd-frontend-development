import { Link } from 'react-router-dom';

/**
 * Breadcrumbs: navegação hierárquica para páginas institucionais
 * Ajuda o usuário a entender onde está e facilita retorno
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.to ? (
            <Link
              to={item.to}
              className="text-[#536558] hover:text-[#2C3E2D] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#2C3E2D] font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-gray-300">›</span>
          )}
        </div>
      ))}
    </nav>
  );
}
