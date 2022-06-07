import classes from './MainNavigation.module.css';
import Link from "next/link"

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Shivam Blogs</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Blog</Link>
          </li>
          <li>
            <Link href='/AddBlogs'>Add New Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
