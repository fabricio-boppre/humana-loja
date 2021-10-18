import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {

  return (
		<footer id={styles.footer}>

			<div id="footer-nucleus">
				
				<div id="f-left">
					<section>
						<h1>Humana</h1>
						<ul>
							<li><a href="http://www.humanasebolivraria.com.br/agenda-cultural/" target="_blank" rel="noreferrer" className="external-link">Agenda Cultural</a></li>
							<li><a href="http://www.humanasebolivraria.com.br/galeria/" target="_blank" rel="noreferrer" className="external-link">Galeria</a></li>
							<li><a href="http://www.humanasebolivraria.com.br/editora/" target="_blank" rel="noreferrer" className="external-link">Editora</a></li>
							<li><a href="http://www.humanasebolivraria.com.br/sobre/" target="_blank" rel="noreferrer" className="external-link">Sobre</a></li>
						</ul>
					</section>
					<section id="social-networks">
						<h1>Redes sociais</h1>
            <ul>
              <li><a href="https://www.facebook.com/pages/category/Bookstore/Humana-Sebo-e-Livraria-436455317131153/" target="_blank" rel="noreferrer" className="external-link">facebook</a></li>
              <li><a href="https://www.instagram.com/humanasebolivraria/" target="_blank" rel="noreferrer" className="external-link">instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UC5bVFV4JYUDLPiJay49fM0w" target="_blank" rel="noreferrer" className="external-link">youtube</a></li>
            </ul>
					</section>
				</div>
		
				<div id="f-right">
					<section>
						<h1>Contato</h1>
						<ul>
							<li><a href="mailto:humanasebolivraria@gmail.com">humanasebolivraria@gmail.com</a></li>
							<li>Telefone/WhatsApp: <a href="https://api.whatsapp.com/send?phone=554933164566" target="_blank" rel="noreferrer" className="external-link">49 3316-4566</a></li>
						</ul>
					</section>
					<section>
						<h1>Endereço</h1>
						<p>Rua Marechal Bormann, 82 D, Sala 13</p>
						<p>Centro, Chapecó-SC</p>
						<p><a href="https://g.page/humanasebolivraria?share" target="_blank" rel="noreferrer" className="external-link">[como chegar]</a></p>
					</section>
					<section>
						<h1>Horário de atendimento</h1>
						<p>Segunda a sexta-feira, das 8h30 às 18h30</p>
						<p>Sábados, das 9 às 12h</p>
					</section>
				</div>
	
				<div id="f-middle">
          <Image
            src="/img/layout/slogan-quadrado.jpg"
            alt="Humana"
            width={180}
            height={145}
          />
				</div>
			
			</div>

    </footer>
	)

}
