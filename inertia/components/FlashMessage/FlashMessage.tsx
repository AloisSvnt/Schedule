import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

function FlashMessage() {
  const { success, errors } = usePage<{ success?: React.ReactNode; errors?: React.ReactNode }>().props;
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (success || errors) {
      setVisible(true);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          setExiting(false);
        }, 500); // Duration of the exit transition
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, errors]);

  return (
    <>
      {visible && success && (
        <div
          role="alert"
          className={`alert alert-success max-w-96 absolute bottom-2 right-2 transition-opacity duration-500 ${exiting ? 'opacity-0' : 'opacity-100'} ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}
      {visible && errors && (
        <div
          role="alert"
          className={`alert alert-error max-w-96 absolute bottom-2 right-2 transition-opacity duration-500 ${
            exiting ? 'opacity-0' : 'opacity-100'
          } ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errors}</span>
        </div>
      )}
    </>
  );
}

export default FlashMessage;