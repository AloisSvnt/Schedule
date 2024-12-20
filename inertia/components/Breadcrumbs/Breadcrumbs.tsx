import { Link } from '@inertiajs/react';


function Breadcrumbs() {
  const url = window.location.pathname;
  const urlArray = url.split('/').filter((item) => item !== '');

  const breadcrumbs = urlArray.map((item, index) => ({
    name: item,
    slug: `/${urlArray.slice(0, index + 1).join('/')}`,
  }));

  return (
    <div className="breadcrumbs text-sm w-full max-w-7xl">
      <ul>
        {breadcrumbs.map((item, index) => (
          <li key={index}>
            {index === breadcrumbs.length - 1 ? (
              item.name.charAt(0).toUpperCase() + item.name.slice(1)
            ) : (
                <Link href={item.slug}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;