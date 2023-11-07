import { CartInfo, CartInfo2, CartIntegrantes } from '@/components/pages/home/components';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Inter, Poppins, Sora } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  return (
    <div className={twMerge(poppins.className,"w-full px-36 relative bg-white flex flex-col")}>
      <div className="w-full h-20 pt-4 justify-between items-center gap-48 inline-flex">
        <div className="w-auto self-stretch pr-8 justify-start items-center gap-1 flex">
          <Image
            width={157}
            height={157}
            className="w-20 h-20"
            src="/assets/logo_black.png"
            alt='logo-sao'
          />
          <div className="text-black text-lg font-bold whitespace-nowrap">
            Sistema de Agendamento Odontológico
          </div>
        </div>
        <div className="w-auto self-stretch pl-4 justify-end items-center gap-6 flex">
          <div className={twMerge(inter.className,"text-gray-800 text-base font-medium leading-normal whitespace-nowrap")}>Pagina Inicial</div>
          <div className={twMerge(inter.className,"text-gray-800 text-base font-medium leading-normal whitespace-nowrap")}>Sobre</div>
          <div className={twMerge(inter.className,"text-gray-800 text-base font-medium leading-normal whitespace-nowrap")}>Contato</div>
          <button className="w-auto px-4 py-2 rounded-full shadow border border-teal-500 justify-center items-center flex whitespace-nowrap aria-hidden:hidden"
            aria-hidden="true"
          >
            <div className={twMerge(inter.className,"text-teal-500 text-lg font-medium leading-normal whitespace-nowrap")}>Agendar Consulta</div>
          </button>
          <button className="px-4 py-2 bg-teal-500 rounded-full shadow justify-center items-center flex"
            onClick={() => router.push('/login')}
          >
            <div className={twMerge(inter.className,"text-white text-lg font-medium leading-normal")}>Acesse a plataforma</div>
          </button>
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <div className="my-auto flex-col justify-start items-start gap-6 inline-flex">
          <div className="w-4/5 flex-col justify-start items-start gap-6 flex">
            <span className="text-black text-5xl font-bold leading-10">
              O seu aliado na gestão odontológica.
            </span>
            <div className={twMerge(sora.className,"text-slate-500 text-base font-normal leading-normal")}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum eget vel, nunc nulla feugiat. Metus ut.
            </div>
          </div>
          <div className="px-7 py-4 bg-gradient-96 from-teal-500 to-teal-600 rounded-full shadow justify-start items-start gap-2.5 inline-flex">
            <button className={twMerge(sora.className,"text-white text-lg font-semibold")}>
              Conheça o SAO
            </button>
          </div>
        </div>
        <Image
          width={157}
          height={157}
          className="w-5/12 h-[31rem]"
          src="/assets/SVG/doutores_homePage.svg"
          alt='doutores_homePage'
        /> 
      </div>  
      <div className="w-full justify-center items-center gap-7 inline-flex mt-24">
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

      <div className="w-full flex justify-around">
        <Image
          width={157}
          height={157}
          className="w-6/12 h-[31rem]"
          src="/assets/SVG/fotoUniso_homePage.svg"
          alt='doutores_homePage'
        /> 
        <div className="w-1/3 flex flex-col justify-center gap-4">
          <span className='text-teal-500 text-xl font-medium tracking-wide'>
            Sobre o Sistema
          </span>
          <span className="text-black text-3xl font-semibold">
            Um sistema voltado para o controle e organização de sua clinica
          </span>
          <span className={twMerge(sora.className,
            "text-slate-500 text-base font-normal font-['Sora'] leading-normal")}
          >
            O Sistema de Agendamento Odontológico é um sistema de gestão odontológica desenvolvido como Trabalho de Conclusão de curso por alunos do curso de Engenharia da Computação. O sistema é voltado para clinicas odontológicas de todos os tamanhos e oferece uma solução completa para a gestão da clinica
          </span>
        </div>
        <div className="IconHealth w-5 h-5 left-[562px] top-[354px] absolute">
        </div>
        <div className="IconHealth w-20 h-16 left-0 top-[105px] absolute">
        </div>
        <div className="IconHealth w-12 h-12 left-[182px] top-[423px] absolute">
        </div>
        <div className="IconHealth w-16 h-16 left-[441px] top-0 absolute">
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="mx-auto flex flex-col gap-3">
          <span className="text-black text-5xl font-bold leading-10 px-10">
            Nossos serviços
          </span>
          <div className="w-full h-1 bg-teal-500 rounded-3xl" />
        </div>
        <div className="w-full h-80 flex-flex justify-center items-center flex-wrap gap-9 flex">
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
        
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="mx-auto flex flex-col gap-3">
          <span className="text-black text-5xl font-bold leading-10 px-10">
            Conheça os Desenvolvedores
          </span>
          <div className="w-full h-1 bg-teal-500 rounded-3xl" />
        </div>
        <div className="w-full flex-flex justify-center items-center flex-wrap gap-9 flex">
          <div className='mx-auto flex gap-9'>
            <CartIntegrantes
              imagem='/assets/home/professores/denicezar.jpg'
              title='Orientador'
              description='Prof. Dr. Denicezar Angelo Baldo'
              urlLinkedin='https://www.linkedin.com/in/denicezar-angelo-baldo-3936aa25'
            />
            <CartIntegrantes
              imagem='/assets/home/professores/michel.jpg'
              title='Coorientador'
              description='Prof. Me. Michel Goncalves da Silva'
              urlLinkedin='https://www.linkedin.com/in/michel-silva-msc-smc-21675916/'
            />
          </div>
          <div className='mx-auto flex gap-9'>
            <CartIntegrantes
              imagem='/assets/home/alunos/felipe.jpg'
              title='Aluno - FullStack'
              description='Felipe Alessander Caetano Luiz'
              urlLinkedin='https://www.linkedin.com/in/felipe-alessander-caetano-luiz-8087ab1a2/'
            />
            <CartIntegrantes
              imagem='/assets/home/alunos/kioyshi.jpg'
              title='Aluno - UX/UI'
              description='Lucas Kiyosh de Lara'
              urlLinkedin='https://www.linkedin.com/in/michel-silva-msc-smc-21675916/'
            />
            <CartIntegrantes
              imagem='/assets/home/alunos/leme.jpg'
              title='Aluno - FrontEnd'
              description='Lucas Leme'
              urlLinkedin='https://www.linkedin.com/in/michel-silva-msc-smc-21675916/'
            />
          </div>
        </div>
        
      </div>

      
      {/* 
      <div className="FormContato w-96 h-96 left-[232px] top-[3230.73px] absolute">
        <div className="Forms w-96 h-96 left-0 top-[142px] absolute">
          <div className="Nome left-0 top-0 absolute text-neutral-900 text-xl font-medium leading-normal">Nome</div>
          <div className="EMail left-0 top-[165.93px] absolute text-neutral-900 text-xl font-medium leading-normal">E-mail</div>
          <div className="Mensagem left-0 top-[331.88px] absolute text-neutral-900 text-xl font-medium leading-normal">Mensagem</div>
          <div className="Telefone left-[517.24px] top-0 absolute text-neutral-900 text-xl font-medium leading-normal">Telefone</div>
          <div className="Rectangle61 w-96 h-20 left-0 top-[48.40px] absolute bg-neutral-100 rounded border border-gray-200" />
          <div className="Rectangle63 w-96 h-20 left-0 top-[214.33px] absolute bg-neutral-100 rounded border border-gray-200" />
          <div className="Rectangle64 w-96 h-72 left-0 top-[380.28px] absolute bg-neutral-100 rounded border border-gray-200" />
          <div className="Rectangle62 w-96 h-20 left-[517.24px] top-[48.40px] absolute bg-neutral-100 rounded border border-gray-200" />
          <div className="SeuNome w-36 h-10 left-[20.69px] top-[69.14px] absolute text-zinc-600 text-xl font-normal leading-normal">Seu nome</div>
          <div className="ContatoEmailCom w-72 h-10 left-[20.69px] top-[235.09px] absolute text-zinc-600 text-xl font-normal leading-normal">contato@email.com</div>
          <div className="OQueVocPrecisa w-72 h-10 left-[20.69px] top-[401.02px] absolute text-zinc-600 text-xl font-normal leading-normal">O que você precisa?</div>
          <div className="9999999999 w-56 h-10 left-[537.93px] top-[69.14px] absolute text-zinc-600 text-xl font-normal leading-normal">(99) 9999-9999</div>
        </div>
        <div className="TemInteresseEmNossoSistema left-[84px] top-0 absolute">
          <span className="text-black text-5xl font-bold leading-10">
            Tem interesse em nosso sistema
          </span>
          <span className="text-teal-700 text-5xl font-bold leading-10">
            ?
          </span>
        </div>
        <div className="Button1 w-72 h-16 px-14 py-5 left-[356px] top-[822.85px] absolute bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-center items-center inline-flex">
          <div className="EnviarMensagem text-white text-lg font-semibold font-['Sora']">Enviar Mensagem</div>
        </div>
        <div className="Rectangle4570 w-96 h-1 left-[250px] top-[98px] absolute bg-teal-500 rounded-3xl" />
        <div className="EntreEmContatoComAGentePorAqui left-[264px] top-[62px] absolute text-slate-500 text-2xl font-normal font-['Sora'] leading-normal">Entre em contato com a gente por aqui</div>
      </div> */}
    </div>
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