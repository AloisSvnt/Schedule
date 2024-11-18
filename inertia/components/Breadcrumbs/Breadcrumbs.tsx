import { Link, usePage } from '@inertiajs/react';

function Breadcrumbs() {
  const { props } = usePage();
  const url = window.location.pathname;
  const urlArray = url.split('/').filter((item) => item !== '');

  const breadcrumbs = urlArray.map((item, index) => ({
    name: item,
    slug: `/${urlArray.slice(0, index + 1).join('/')}`,
  }));

  const lastBreadcrumbName = props.folder ?
    props.folder.name.charAt(0).toUpperCase() + props.folder.name.slice(1) :
    breadcrumbs[breadcrumbs.length - 1]?.name.charAt(0).toUpperCase() + breadcrumbs[breadcrumbs.length - 1]?.name.slice(1);

  return (
    <div className="breadcrumbs text-sm w-full max-w-7xl">
      <ul>
        {breadcrumbs.map((item, index) => (
          <li key={index}>
            {index === breadcrumbs.length - 1 ? (
              lastBreadcrumbName
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