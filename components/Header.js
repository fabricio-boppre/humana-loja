import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {

  return <div id={styles.header}>
          
          <div id="header-content">

            <Link href="/">
              <a id="header-logotipo">
              </a>
            </Link>
            
            <div id="header-services">
              <ul>
                <li>
                  <a href="https://www.facebook.com/pages/category/Bookstore/Humana-Sebo-e-Livraria-436455317131153/">
                    <Image
                      src="/img/layout/servico-facebook.svg"
                      alt="facebook"
                      title="facebook" 
                      width="12.46px"
                      height="60"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/humanasebolivraria/">
                    <Image
                      src="/img/layout/servico-instagram.svg"
                      alt="instagram"
                      title="instagram"
                      width="27"
                      height="60"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UC5bVFV4JYUDLPiJay49fM0w">
                    <Image
                      src="/img/layout/servico-youtube.svg"
                      alt="youtube"
                      title="youtube"
                      width="39"
                      height="60"
                    />
                  </a>
                </li>
              </ul>
            </div>
          
          </div>
            
         </div>
}
