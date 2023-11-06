import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Inter, Poppins } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900" ]
})

const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900" ]
})

export default function Home():JSX.Element {
  const router = useRouter();
  return (
    <div className={twMerge(poppins.className,"w-full h-96 relative bg-white")}>
      <div className="w-full h-96 left-0 top-0 absolute">
        <div className="w-auto h-96 left-0 top-0 absolute bg-white" />
        <div className="w-auto h-96 left-[-644px] top-[-463px] absolute bg-teal-50 rounded-full" />
        <div className="w-auto h-96 left-[1044px] top-[483px] absolute bg-teal-50 rounded-full" />
      </div>
      <div className="h-80 left-[163px] top-[284px] absolute flex-col justify-start items-start gap-6 inline-flex">
        <div className="h-56 flex-col justify-start items-start gap-6 flex">
          <div className="Frame37578 h-4" />
          <div className="OSeuAliadoNaGestOOdontolGica w-96">
            <span className="text-black text-5xl font-bold leading-10">
              O seu aliado na gestão odontológica
            </span>
            <span className="text-teal-700 text-5xl font-bold leading-10">
              .
            </span>
          </div>
          <div className="LoremIpsumDolorSitAmetConsecteturAdipiscingElitElementumEgetVelNuncNullaFeugiatMetusUt w-96 h-12 text-slate-500 text-base font-normal font-['Sora'] leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum eget vel, nunc nulla feugiat. Metus ut.
          </div>
        </div>
        <div className="px-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-start items-start gap-2.5 inline-flex">
          <div className="justify-start items-start gap-2 flex">
            <div className="w-6 h-6 relative" />
            <div className="text-white text-lg font-semibold font-['Sora']">
              Conheça o SAO
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-20 px-36 pt-4 left-0 top-0 absolute justify-between items-center gap-48 inline-flex">
        <div className="w-auto self-stretch pr-8 justify-start items-center gap-1 flex">
          <Image
            width={157}
            height={157}
            className="w-20 h-20"
            src="/assets/logo_black.png"
            alt='logo-sao'
          />
          <div className="text-black text-lg font-bold">
            Sistema de Agendamento Odontológico
          </div>
        </div>
        <div className="w-auto self-stretch pl-4 justify-end items-center gap-6 flex">
          <div className={twMerge(inter.className,"text-gray-800 text-base font-medium leading-normal")}>Pagina Inicial</div>
          <div className={twMerge(inter.className,"text-gray-800 text-base font-medium leading-normal")}>Sobre</div>
          <div className={twMerge(inter.className,"text-gray-800 text-base font-medium leading-normal")}>Contato</div>
          <button className="w-48 px-4 py-2 rounded-full shadow border border-teal-500 justify-center items-center flex aria-hidden:hidden"
            aria-hidden="true"
          >
            <div className={twMerge(inter.className,"text-teal-500 text-lg font-medium leading-normal")}>Agendar Consulta</div>
          </button>
          <button className="px-4 py-2 bg-teal-500 rounded-full shadow justify-center items-center flex"
            onClick={() => router.push('/login')}
          >
            <div className={twMerge(inter.className,"text-white text-lg font-medium leading-normal")}>Acesse a plataforma</div>
          </button>
        </div>
      </div>
      <div className="ImagemExemplo w-96 h-96 left-[706px] top-[186px] absolute">
        <div className="Group9411 w-96 h-96 left-0 top-[10.03px] absolute">
          <div className="Ellipse3 w-96 h-96 left-[102.72px] top-[33.14px] absolute bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" />
          <div className="MaskGroup w-96 h-96 left-[102.72px] top-[33.96px] absolute">
            <div className="Ellipse2 w-96 h-96 left-0 top-0 absolute bg-gradient-to-r from-blue-500 to-violet-600 rounded-full shadow" />
            <div className="DoctorFemaleCopia1 w-96 h-96 left-[26.51px] top-[-9.94px] absolute" />
            <img className="Icon2 w-96 h-96 left-[-102.72px] top-[-33.96px] absolute" src="https://via.placeholder.com/678x506" />
          </div>
          <img className="Icon2 w-80 h-72 left-[365.32px] top-[-0px] absolute" src="https://via.placeholder.com/313x302" />
          <img className="Icon2 w-72 h-72 left-0 top-0 absolute" src="https://via.placeholder.com/300x302" />
        </div>
        <img className="Plus w-24 h-20 left-[142.03px] top-0 absolute" src="https://via.placeholder.com/88x88" />
        <img className="Plus w-11 h-11 left-[473.93px] top-[473.23px] absolute" src="https://via.placeholder.com/44x43" />
        <img className="Plus w-7 h-7 left-[558.97px] top-[130.01px] absolute" src="https://via.placeholder.com/27x26" />
      </div>
      <div className="w-96 h-64 left-0 top-[786px] absolute bg-white" />
      <div className="left-[288px] top-[747px] absolute shadow justify-start items-start gap-7 inline-flex">
        <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl justify-start items-center gap-3 flex">
          <div className="w-9 h-9 relative" />
          <div className="w-44 flex-col justify-center items-start inline-flex">
            <div className="text-center text-white text-lg font-semibold">Agenda Clinica</div>
            <div className="w-56 opacity-80 text-white text-xs font-normal font-['Sora'] leading-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl justify-start items-center gap-3 flex">
          <div className="w-9 h-9 relative" />
          <div className="flex-col justify-center items-start inline-flex">
            <div className="text-center text-white text-lg font-semibold">Acesso Fácil</div>
            <div className="w-52 opacity-80 text-white text-xs font-normal font-['Sora'] leading-none">Lorem ipsum dolor sit amet, con sectetur adipiscing elit.</div>
          </div>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl justify-start items-center gap-3 flex">
          <div className="w-9 h-9 p-3 justify-center items-center flex">
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <div className="w-9 h-9 relative">
              </div>
            </div>
          </div>
          <div className="flex-col justify-center items-start inline-flex">
            <div className="text-center text-white text-lg font-semibold">Organização</div>
            <div className="w-44 opacity-80 text-white text-xs font-normal font-['Sora'] leading-none">Lorem ipsum dolor sit amet, consectetur adipiscin.</div>
          </div>
        </div>
      </div>
      <div className="w-96 h-96 left-[165px] top-[2058.73px] absolute">
        <div className="left-[192px] top-0 absolute">
          <span className="text-black text-5xl font-bold leading-10">
            Conheça os Desenvolvedores
          </span>
          <span className="text-teal-700 text-5xl font-bold leading-10">.
          </span>
        </div>
        <div className="w-96 h-96 left-0 top-[114px] absolute flex-col justify-center items-center gap-9 inline-flex">
          <div className="justify-center items-center gap-9 inline-flex">
            <div className="p-8 bg-white rounded-3xl flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch shadow justify-center items-center gap-2.5 inline-flex">
                  <img className="w-44 h-48" src="https://via.placeholder.com/177x200" />
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Orientador</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
                <div className="h-14 pl-14 pr-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex">
                  <div className="w-48 text-white text-lg font-semibold font-['Sora']">Acessar Linkedin</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch h-48 flex-col justify-center items-center gap-2.5 flex">
                  <img className="w-44 h-48" src="https://via.placeholder.com/177x200" />
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Coorientador</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
                <div className="h-14 pl-14 pr-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex">
                  <div className="w-48 text-white text-lg font-semibold font-['Sora']">Acessar Linkedin</div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-9 inline-flex">
            <div className="p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <img className="w-44 h-48" src="https://via.placeholder.com/177x200" />
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Nome 1</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
                <div className="h-14 pl-14 pr-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex">
                  <div className="w-48 text-white text-lg font-semibold font-['Sora']">Acessar Linkedin</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <img className="w-44 h-48" src="https://via.placeholder.com/177x200" />
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Nome 2</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
                <div className="h-14 pl-14 pr-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex">
                  <div className="w-48 text-white text-lg font-semibold font-['Sora']">Acessar Linkedin</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <img className="w-44 h-48" src="https://via.placeholder.com/177x200" />
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Nome 3</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
                <div className="h-14 pl-14 pr-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex">
                  <div className="w-48 text-white text-lg font-semibold font-['Sora']">Acessar Linkedin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-96 h-1 left-[305px] top-[70px] absolute bg-teal-500 rounded-3xl" />
      </div>
      <div className="w-96 h-96 left-[158px] top-[1494.73px] absolute">
        <div className="left-[363px] top-0 absolute">
          <span className="text-black text-5xl font-bold leading-10">
            Nossos serviços
          </span>
          <span className="text-teal-700 text-5xl font-bold leading-10">
            .
          </span>
        </div>
        <div className="w-96 h-80 left-0 top-[114px] absolute flex-col justify-start items-start gap-9 inline-flex">
          <div className="justify-start items-start gap-9 inline-flex">
            <div className="p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Agendamento</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Fila de espera</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="w-72 text-center text-black text-2xl font-medium leading-tight">Financeiro</div>
                  <div className="w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Frame37585 justify-start items-start gap-9 inline-flex">
            <div className="Frame37553 p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="Frame37552 flex-col justify-start items-start gap-6 flex">
                <div className="Frame37551 flex-col justify-start items-start gap-3 flex">
                  <div className="Pacientes w-72 text-center text-black text-2xl font-medium leading-tight">Pacientes</div>
                  <div className="LoremIpsumDolorSitAmetConsecteTurAdipiscingElitAliquetItristiqueIdNibhLobortisNunc w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
              </div>
            </div>
            <div className="Frame37554 p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="Frame37552 flex-col justify-start items-start gap-6 flex">
                <div className="Frame37551 flex-col justify-start items-start gap-3 flex">
                  <div className="Disciplinas w-72 text-center text-black text-2xl font-medium leading-tight">Disciplinas</div>
                  <div className="LoremIpsumDolorSitAmetConsecteTurAdipiscingElitAliquetItristiqueIdNibhLobortisNunc w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
              </div>
            </div>
            <div className="Frame37555 p-8 bg-white rounded-3xl shadow flex-col justify-start items-start gap-6 inline-flex">
              <div className="Frame37552 flex-col justify-start items-start gap-6 flex">
                <div className="Frame37551 flex-col justify-start items-start gap-3 flex">
                  <div className="UsuRios w-72 text-center text-black text-2xl font-medium leading-tight">Usuários</div>
                  <div className="LoremIpsumDolorSitAmetConsecteTurAdipiscingElitAliquetItristiqueIdNibhLobortisNunc w-72 text-slate-500 text-sm font-normal font-['Sora'] leading-tight">Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Rectangle4569 w-96 h-1 left-[312px] top-[70px] absolute bg-teal-500 rounded-3xl" />
      </div>
      <div className="Footer w-96 h-96 left-0 top-[4189px] absolute">
        <div className="Rectangle1076 w-96 h-96 left-0 top-0 absolute bg-gradient-to-r from-teal-500 to-teal-600" />
        <div className="Frame37577 w-96 h-72 left-[165px] top-[65.93px] absolute bg-gradient-to-r from-teal-500 to-teal-600 flex-col justify-start items-center gap-10 inline-flex">
          <div className="Frame37576 w-96 h-44 relative">
            <div className="Frame37572 left-0 top-0 absolute flex-col justify-start items-start gap-6 inline-flex">
              <div className="Frame37570 flex-col justify-start items-start gap-4 flex">
                <img className="Logo3 w-24 h-24" src="https://via.placeholder.com/100x100" />
              </div>
              <div className="Frame37571 justify-start items-start gap-8 inline-flex">
                <div className="Facebook w-8 h-8 relative">
                  <div className="Facebook w-8 h-8 left-0 top-0 absolute">
                  </div>
                </div>
                <div className="Whatsapp w-8 h-8 relative">
                  <div className="Whatsapp w-8 h-8 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame37574 left-[482px] top-0 absolute flex-col justify-start items-start gap-6 inline-flex">
              <div className="InformaEs text-white text-xl font-semibold">Informações</div>
              <div className="Frame37573 flex-col justify-start items-start gap-4 flex">
                <div className="PaginaInicial opacity-80 text-white text-base font-normal font-['Sora']">Pagina Inicial</div>
                <div className="Sobre opacity-80 text-white text-base font-normal font-['Sora']">Sobre</div>
                <div className="Contato opacity-80 text-white text-base font-normal font-['Sora']">Contato</div>
              </div>
            </div>
            <div className="Frame37576 left-[956px] top-[5px] absolute flex-col justify-start items-start gap-6 inline-flex">
              <div className="Contato text-white text-xl font-semibold">Contato</div>
              <div className="Frame37573 flex-col justify-start items-start gap-4 flex">
                <div className="1123456789 opacity-80 text-white text-base font-normal font-['Sora']">+1 123456789</div>
                <div className="SaoMailCom opacity-80 text-white text-base font-normal font-['Sora']">sao@mail.com</div>
                <div className="Phone112345678 opacity-80 text-white text-base font-normal font-['Sora']">Phone: +1 12345678</div>
              </div>
            </div>
          </div>
          <div className="Line1 w-96 h-px opacity-60 border border-white"></div>
          <div className="SaoAllRights2023 opacity-80 text-white text-base font-normal font-['Sora']">© SAO all rights 2023</div>
        </div>
      </div>
      <div className="SobreOSisterma w-96 h-96 left-[151px] top-[924px] absolute">
        <div className="SectionThird w-96 h-96 left-[43.50px] top-[37px] absolute justify-center items-center gap-32 inline-flex">
          <div className="UnsplashJgmbzypofpc w-96 h-96 origin-top-left rotate-180 bg-gradient-to-tr from-teal-200 to-blue-500 rounded-3xl" />
          <div className="Content flex-col justify-center items-start inline-flex">
            <div className="Frame2987 flex-col justify-start items-start gap-3.5 flex">
              <div className="Frame37578 self-stretch h-6 justify-start items-start inline-flex">
                <div className="SobreOSistema text-teal-500 text-xl font-medium tracking-wide">Sobre o Sistema </div>
              </div>
              <div className="UmSistemaVoltadoParaOControleEOrganizaODeSuaClinica w-96">
                <span className="text-black text-3xl font-semibold">
                  Um sistema voltado para o controle e organização de sua clinica
                </span>
                <span className="text-teal-700 text-3xl font-semibold">
                  .
                </span>
            </div>
              <div className="OSistemaDeAgendamentoOdontolGicoUmSistemaDeGestOOdontolGicaDesenvolvidoComoTrabalhoDeConclusODeCursoPorAlunosDoCursoDeEngenhariaDaComputaOOSistemaVoltadoParaClinicasOdontolGicasDeTodosOsTamanhosEOfereceUmaSoluOCompletaParaAGestODaClinica w-96 h-36 text-slate-500 text-base font-normal font-['Sora'] leading-normal">O Sistema de Agendamento Odontológico é um sistema de gestão odontológica desenvolvido como Trabalho de Conclusão de curso por alunos do curso de Engenharia da Computação. O sistema é voltado para clinicas odontológicas de todos os tamanhos e oferece uma solução completa para a gestão da clinica</div>
            </div>
          </div>
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
      </div>
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