// eslint-disable-next-line react/prop-types
export const ListboxWrapper = ({ children }): JSX.Element => (
  <div className="w-full h-full max-w-[300px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
)
