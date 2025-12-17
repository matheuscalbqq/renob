import renob_logo from '@/assets/logo-renob-vet.png'
import fapemig_logo from '@/assets/fapemig-logo.png'
import sus_logo from '@/assets/sus-logo.png'
import ufv_logo from '@/assets/UFV-logo.png'
import ms_logo from '@/assets/ms-logo.png'
import gov_logo from '@/assets/gov-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWhatsapp, faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="relative mt-auto border-t bg-background">
      <div className="min-h-64 mx-auto px-6 py-2 text-sm text-white/80 text-center bg-gradient-to-t from-primary to-primary/60">
        <div className='grid grid-row-2 gap-2 mt-4 mb-4'>
            <div className="mx-auto max-w-5xl grid grid-cols-3 items-start gap-x-10">
              {/* Coluna 1: logo + texto */}
              <div className="flex flex-col items-start gap-2">
                <a href='https://www.renobmg.ufv.br/' target="_blank">
                  <img className="h-16" src={renob_logo} alt="Logo Renob" />
                  <span className="text-lg font-semibold">RENOB-MG</span>
                </a>
              </div>

              {/* Coluna 2: Whats/Face/Insta */}
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <a href='https://api.whatsapp.com/message/CGRQHGP3A66ZJ1' target="_blank">
                    <FontAwesomeIcon icon={faWhatsapp} className="text-lg leading-none relative top-[2px]" />
                    <span className="text-base leading-none">(31) 3612-5200</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <a href='https://www.facebook.com/projetorenobmg/' target="_blank">
                    <FontAwesomeIcon icon={faFacebook} className="text-lg leading-none relative top-[2px]" />
                    <span className="text-base leading-none">projetorenobmg</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <a href='https://www.instagram.com/renobmg/' target="_blank">
                    <FontAwesomeIcon icon={faInstagram} className="text-lg leading-none relative top-[2px]" />
                    <span className="text-base leading-none">renobmg</span>
                  </a>
                </div>
              </div>

              {/* Coluna 3: telefone + email */}
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <a href='tel:+553136125195' target="_blank">
                    <FontAwesomeIcon icon={faPhone} className="text-lg leading-none relative top-[2px]" />
                    <span className="text-base leading-none">(31) 3612-5195</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <a href='mailto:renob@ufv.br' target="_blank">
                    <FontAwesomeIcon icon={faEnvelope} className="text-lg leading-none relative top-[2px]" />
                    <span className="text-base leading-none">renob@ufv.br</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-6 mb-6 items-center">
                <img className='h-16' src={ufv_logo} alt="Logo UFV"/>
                <img className='h-16' src={fapemig_logo} alt="Logo FAPEMIG"/>
                <img className='h-16' src={sus_logo} alt="Logo SUS"/>
                <img className='h-10' src={ms_logo} alt="Logo Ministério da Saúde"/>
                <img className='h-16' src={gov_logo} alt="Logo Governo Brasileiro"/>
            </div>
        </div>
        <hr  className="absolute inset-x-0 bottom-4 my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-35" />
        <div className='absolute inset-x-0 bottom-2'>
            © {new Date().getFullYear()} RENOB-MG · Desenvolvido por Matheus Albuquerque
        </div>
      </div>
    </footer>
  );
};

export default Footer;