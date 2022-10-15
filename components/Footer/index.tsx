const Footer = () => {
  return (
    <footer className="h-14 flex justify-center items-center border-t border-border dark:border-dark-border bg-bg-neutral dark:bg-dark-bg-neutral text-text dark:text-dark-text">
      <span>
        <a
          className="text-text dark:text-dark-text"
          target="__blank"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">
          CC BY-NC-SA 4.0
        </a>
        {` © melon95.`}
      </span>
      <span className="ml-8">
        Designed and Proudly powered by Next、Docker、Tailwind.
      </span>
    </footer>
  )
}

export default Footer
