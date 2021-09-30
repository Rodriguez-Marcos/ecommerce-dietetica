import React from 'react'
import styles from './Footer.module.css'



function Footer() {
    return (
        <div className={styles.mainFooter}>
            <div className={styles.about}>
                <p>
                   Salvatore
                </p>
            </div>
            <div className={styles.contactMe}>
                <p>Contacto </p>
            </div>
            <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'/>

            <div class={styles.socialMedia}>
			    <a href="https://www.facebook.com/salvatoretiendasaludablecba"
                 rel='noreferrer' target="_BLANK" className={styles.socialMediaIcon}>
                <i class='bx bxl-facebook' ></i>
			    </a>
			    <a href="https://www.instagram.com/salvatore.tiendasaludablecba/?hl=es-la" 
                rel='noreferrer' target="_BLANK" className={styles.socialMediaIcon}>
                <i class='bx bxl-instagram' ></i>
				</a>
			    <a href="mailto:salvatoretiendasaludable@gmail.com" className={styles.socialMediaIcon}>
				<i class='bx bx-mail-send'></i>
			</a>
			</div>
		</div>
    )
}

export default Footer