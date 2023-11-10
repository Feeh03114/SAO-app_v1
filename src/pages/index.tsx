import { Input } from '@/components/elementTag/input';
import { CartInfo, CartInfo2, CartInfo2Mobile, CartIntegrantes } from '@/components/pages/home/components';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Inter, Poppins, Sora } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuClock } from 'react-icons/lu';
import { MdCheckCircle } from 'react-icons/md';
import { RiOrganizationChart } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900" ]
})

const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900" ]
})

const sora = Sora({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800" ]
})

export default function Home():JSX.Element {
  const router = useRouter();

  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark');
  }, []);

  return (
    <>
      <div className={twMerge("w-screen elative bg-teal-50 flex flex-col justify-center items-center overflow-hidden", poppins.className)}>
        <div className="w-full h-20 md:w-11/12 pt-4 flex flex-row flex-nowrap items-center justify-between">
          <div className="w-full flex flex-row items-center justify-start">
            <img
              width={157}
              height={157}
              className="w-20 h-20 ml-5 md:ml-0 mr-24 md:mr-0 resize-none"
              src="/assets/logo_black.png"
              alt='logo-sao'
            />
            <div className={twMerge("hidden lg:flex text-black text-sm font-bold", poppins.className)}>
              Sistema de Agendamento Odontológico
            </div>
          </div>
     
          <div className="hidden lg:flex items-center">
            <div className={twMerge("text-gray-800 text-base font-medium leading-normal whitespace-nowrap", inter.className)}>Pagina Inicial</div>
            <div className={twMerge("ml-3 text-gray-800 text-base font-medium leading-normal whitespace-nowrap", inter.className)}>Sobre</div>
            <div className={twMerge("ml-3 text-gray-800 text-base font-medium leading-normal whitespace-nowrap", inter.className)}>Contato</div>
            <button className="h-11 ml-3 px-4 py-2 rounded-full shadow border border-teal-500 justify-center items-center flex"
              aria-hidden="true"
            >
              <div className={twMerge("text-teal-500 text-lg font-medium leading-5 whitespace-nowrap", inter.className)}>Agendar Consulta</div>
            </button>
            <button className="h-14 ml-3 px-4 py-2 bg-teal-500 rounded-full shadow justify-center items-center flex"
              onClick={() => router.push('/login')}
            >
              <p className={twMerge("text-white text-lg font-medium leading-5 truncate", inter.className)}>Acesse a plataforma</p>
            </button>
          </div>
          <div><GiHamburgerMenu className="w-6 h-6 lg:hidden mr-6"/></div>
        </div>

        <div className="w-full mt-6 md:mt-32 md:px-6 flex flex-row items-center justify-center">
          <div className="flex flex-row justify-center items-center">
            <div className="hidden md:flex flex-col justify-start">
              <span className={twMerge("text-black text-5xl font-bold leading-10", poppins.className)}>
                O seu aliado na gestão odontológica.
              </span>
              <div className={twMerge("w-96 mt-6 text-base font-normal leading-normal font-['Sora'] text-slate-500 ", sora.className)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum eget vel, nunc nulla feugiat. Metus ut.
              </div>
              <div className="w-56 mt-6 px-7 py-4 bg-gradient-96 from-teal-500 to-teal-600 rounded-full shadow justify-start items-start inline-flex">
                <button className={twMerge("text-white text-lg font-semibold", sora.className)}>
                  Conheça o SAO
                </button>
              </div>
            </div>
            <Image
                width={157}
                height={157}
                className="w-1/2 hidden md:flex"
                src="/assets/SVG/odonto_homePage.svg"
                alt='odonto_homePage'
            /> 

            <div className="w-80 flex md:hidden flex-col items-center">
              <span className={twMerge("text-black text-xl font-bold leading-7", poppins.className)}>
                O seu aliado na gestão odontológica.
              </span>
              <Image
                width={200}
                height={145.84}
                className="md:hidden mt-2"
                src="/assets/SVG/odonto_homePage.svg"
                alt='odonto_homePage'
              /> 
              <div className={twMerge("mt-6 text-sm font-normal leading-5 text-slate-500", sora.className)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum eget vel, nunc nulla feugiat. Metus ut.
              </div>
              <div className="w-48 h-10 mt-6 px-7 flex justify-center items-center bg-gradient-96 from-teal-500 to-teal-600 rounded-full shadow">
                <button className={twMerge("text-white text-sm font-semibold", sora.className)}>
                  Conheça o SAO
                </button>
              </div>
            </div>
          </div>
        </div>
              
        <div className="w-full mt-7 md:mt-24 gap-7 flex flex-col md:flex-row justify-center items-center">
          <CartInfo
            icon={LuClock}
            title="Agenda Clinica"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <CartInfo
            icon={MdCheckCircle}
            title="Acesso Fácil"
            description="Lorem ipsum dolor sit amet, con sectetur adipiscing elit."
          />
          <CartInfo
            icon={RiOrganizationChart}
            title="Organização"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start md:justify-evenly items-center mt-12 md:mt-24">
          <Image
            width={157}
            height={157}
            className="w-1/2"
            src="/assets/SVG/fotoUniso_homePage.svg"
            alt='doutores_homePage'
          /> 
          <div className="w-80 md:w-1/3 flex flex-col justify-center gap-2 md:gap-4">
            <span className={twMerge("text-teal-500 text-sm md:text-xl font-medium leading-normal tracking-wide", poppins.className)}>
              Sobre o Sistema
            </span>
            <span className={twMerge("text-black text-lg md:text-3xl leading-normal font-semibold", poppins.className)}>
              Um sistema voltado para o controle e organização de sua clinica
            </span>
            <span className={twMerge("text-slate-500 text-sm md:text-base font-normal font-['Sora'] leading-normal", sora.className)}>
              O Sistema de Agendamento Odontológico é um sistema de gestão odontológica desenvolvido como Trabalho de Conclusão de curso por alunos do curso de Engenharia da Computação. O sistema é voltado para clinicas odontológicas de todos os tamanhos e oferece uma solução completa para a gestão da clinica
            </span>
          </div>
        </div>

        <div className="w-80 md:w-full flex flex-col gap-6 mt-24">
          <div className="mx-auto flex flex-col md:gap-3">
            <span className={twMerge("text-black text-xl md:text-5xl font-bold leading-7 md:leading-10 px-10", poppins.className)}>
              Nossos serviços
            </span>
            <div className="w-full h-1 mt-1 bg-teal-500 rounded-3xl" />
          </div>
          <div className="w-full hidden md:flex justify-center items-center flex-wrap gap-9">
            <CartInfo2
              title='Agendamento'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2
              title='Fila de espera'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2
              title='Financeiro'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2
              title='Pacientes'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2
              title='Disciplinas'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2
              title='Usuários'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
          </div>
          <div className="w-full md:hidden flex justify-center items-center flex-wrap gap-4">
            <CartInfo2Mobile
              title='Agendamento'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2Mobile
              title='Fila de espera'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2Mobile
              title='Financeiro'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2Mobile
              title='Pacientes'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2Mobile
              title='Disciplinas'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <CartInfo2Mobile
              title='Usuários'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 my-12 md:mt-24">
          <div className="flex flex-col justify-center items-center md:gap-3">
            <span className={twMerge("text-center text-black text-xl md:text-5xl font-bold leading-7 md:leading-10 px-10 md:whitespace-nowrap", poppins.className)}>
              Conheça os Desenvolvedores.
            </span>
            <div className="w-60 md:w-[52rem] h-1 mt-1 bg-teal-500 rounded-3xl" />
          </div>
          <div className="w-full flex-col justify-center items-center flex-wrap gap-4 md:gap-9 flex">
            <div className='mx-auto flex justify-center items-center flex-wrap gap-4 md:gap-9'>
              <CartIntegrantes
                imagem='/assets/home/professores/denicezar.jpg'
                title='Orientador'
                description='Prof. Me. Denicezar Angelo Baldo'
                urlLinkedin='https://www.linkedin.com/in/denicezar-angelo-baldo-3936aa25'
              />
              <CartIntegrantes
                imagem='/assets/home/professores/michel.jpg'
                title='Coorientador'
                description='Prof. Me. Michel Goncalves da Silva'
                urlLinkedin='https://www.linkedin.com/in/michel-silva-msc-smc-21675916'
              />
            </div>
            <div className='mx-auto flex justify-center items-center flex-wrap gap-4 md:gap-9'>
              <CartIntegrantes
                imagem='/assets/home/alunos/felipe.jpg'
                title='Aluno - FullStack'
                description='Felipe Alessander Caetano Luiz'
                urlLinkedin='https://www.linkedin.com/in/felipe-alessander-caetano-luiz-8087ab1a2'
              />
              <CartIntegrantes
                imagem='/assets/home/alunos/kioyshi.jpg'
                title='Aluno - UX/UI'
                description='Lucas Kiyosh de Lara'
                urlLinkedin='https://www.linkedin.com/in/lucas-kiyoshi-296a4a199'
              />
              <CartIntegrantes
                imagem='/assets/home/alunos/leme.jpg'
                title='Aluno - FrontEnd'
                description='Lucas Leme Cardoso Ferreira'
                urlLinkedin='https://www.linkedin.com/in/lucas-leme'
              />
            </div>
          </div>
        </div>

        <div className="w-full py-4 md:py-12 flex flex-col justify-center items-center bg-white">
          <div className="mx-auto flex flex-col md:gap-3">
            <span className={twMerge("text-black text-xl md:text-5xl font-bold leading-7 md:leading-10 px-10 whitespace-nowrap", poppins.className)}>
              Nossos parceiros.
            </span>
            <div className="w-full h-1 mt-1 bg-teal-500 rounded-3xl"/>
          </div>
          <div className="mt-4 md:mt-20 flex flex-row flex-wrap justify-center">
            <img
              className="h-14 md:h-20 resize-none"
              src="/assets/log1.png"
              alt='logo-sao'
            />
            <img
              className="h-14 md:h-20 mt-8 md:mt-0 resize-none"
              src="/assets/logo_nucleo_ti.png"
              alt='logo-nucleo-ti-uniso'
            />
          </div>
        </div>

        <div className="w-full py-12 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center md:gap-3">
            <span className={twMerge("px-20 md:px-10 text-black text-center text-xl md:text-5xl font-bold leading-7 md:leading-10 md:whitespace-nowrap", poppins.className)}>
              Tem interesse em nosso sistema?
            </span>
            <span className={twMerge("text-slate-500 text-center text-xs md:text-2xl font-bold leading-5 px-10 md:whitespace-nowrap", poppins.className)}>
              Entre em contato com a gen por aqui
            </span>
            <div className="w-60 md:w-full h-1 mt-1 bg-teal-500 rounded-3xl" />
          </div>
          <form className="w-5/6 mt-8 md:mt-0 flex flex-row flex-wrap justify-center items-center">
            <div className="w-full md:w-1/2 mt-2 md:mt-8 md:pr-8">
              <Input 
                id="name"
                type="text"
                className="w-full rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                label="Nome"
                placeholder="Nome"
                // {...register("name")}
                // error={errors.name}
              />
            </div>
            <div className="w-full md:w-1/2 mt-2 md:mt-8">
              <Input 
                id="phone"
                type="text"
                className="w-full rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-50 focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                label="Telefone"
                placeholder="Telefone"
                // {...register("name")}
                // error={errors.name}
              />
            </div>
            <div className="w-full mt-2 md:mt-8">
              <Input 
                id="email"
                type="text"
                className="w-full rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                label="E-mail"
                placeholder="E-mail"
                // {...register("name")}
                // error={errors.name}
              />
            </div>
            <div className="w-full flex items-center mt-2 md:mt-8">
              <div className="w-full">
                <label className="pl-4 text-sm font-medium leading-tight text-gray-700">Mensagem</label>
                <textarea 
                    id="mensagem"
                    className="w-full h-40 text-sm rounded-lg px-4 py-2  shadow border border-gray-300 text-gray-900 placeholder-gray-500  focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                    placeholder="O que você precisa?"
                    // {...register("queixa")}
                />
              </div>
            </div>
            <div className="w-full md:w-72 h-10 md:h-16 mt-6 flex justify-center items-center bg-gradient-96 from-teal-500 to-teal-600 rounded-full shadow">
              <button className={twMerge("text-white text-lg font-semibold", sora.className)}>
                Envia Mensagem
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full py-10 pb-10 flex flex-row flex-wrap items-center justify-center relative bg-gradient-96 from-teal-500 to-teal-600 overflow-hidden">
        <div className="w-5/6 flex flex-row flex-wrap justify-center md:justify-evenly items-center ">
          <div className="w-auto flex flex-col justify-center md:justify-between">
            <Image
              width={157}
              height={157}
              className="w-20 h-20"
              src="/assets/logo_white.png"
              alt='logo-sao-white'
            />
            <span className={twMerge("w-64 hidden md:flex text-base leading-normal font-normal opacity-80 text-white", sora.className)}>SAO é a escolha certa para os dentistas que buscam eficiência e produtividade.</span>
          </div>

          <div className="hidden md:flex flex-col text-white">
            <span className="flex font-semibold text-xl">Informações</span>
            <span className="opacity-80 text-base leading-normal whitespace-nowrap">Pagina Inicial</span>
            <span className="opacity-80 text-base leading-normal whitespace-nowrap">Sobre</span>
            <span className="opacity-80 text-base leading-normal whitespace-nowrap">Contato</span>
          </div>
          <div className="hidden md:flex flex-col text-white">
            <span className="flex font-semibold text-xl">Contato</span>
            <span className="opacity-80 text-base leading-normal whitespace-nowrap">WhatsApp: <a className='hover:text-teal-900' href='https://api.whatsapp.com/send?phone=551531995393&text=Ol%C3%A1'>+55 15 3199-5393</a></span>
            <span className="opacity-80 text-base leading-normal whitespace-nowrap">E-mail: <a className='hover:text-teal-900' href='mailto:sao@labprivate.cloud'>sao@labprivate.cloud</a></span>
          </div>

          <div className="md:hidden flex flex-row flex-wrap justify-center">
            <span className={twMerge("opacity-80 text-base font-medium leading-normal text-white", sora.className)}>Pagina Inicial | </span>
            <span className={twMerge("opacity-80 text-base font-medium leading-normal text-white", sora.className)}>Sobre | </span>
            <span className={twMerge("opacity-80 text-base font-medium leading-normal text-white", sora.className)}>Contato | </span>
            <span className={twMerge("opacity-80 text-base font-medium leading-normal text-white", sora.className)}>sao@email.com | </span>
          </div>
        </div>
        <div className="w-11/12 h-px my-10 bg-white opacity-60"/>
        <span className="mx-auto text-white opacity-80 text-base leading-normal whitespace-nowrap">© SAO all rights 2023</span>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  if(session === null)
    return {
      props: {
        session,
      },
    }
  else
    if(session?.menu?.length === 0) signOut({callbackUrl: '/login'});

    return {
      redirect: {
        permanent: false,
        destination: session?.menu[0].url,
      },
      props: {
        session,
      },
    }
};