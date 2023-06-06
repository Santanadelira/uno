import { Fragment, useState } from "react";
import logo from "../../assets/logo.svg";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { navitems } from "./navitems/navitems.ts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice.ts";
import { clearSolicitacoes } from "../../features/solicitacoes/solicitacoesSlice.ts";
import { clearSolicitantes } from "../../features/solicitantes/solicitantesSlice.ts";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const usuario = useSelector(selectUser);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearSolicitacoes())
    dispatch(clearSolicitantes())
  }

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex w-5/6 max-w-7xl items-center justify-between py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Uno</span>
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {navitems.map((item) =>
            item.dropdown ? (
              item.cargos.includes(usuario.cargo) ? (
                <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 font-inter">
                  {item.titulo}
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {item.dropdown.map((dropItem) => (
                        dropItem.cargos.includes(usuario.cargo) ? (<div
                          key={dropItem.id}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <dropItem.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <Link
                              to={dropItem.path}
                              className="block font-semibold text-gray-900 font-inter"
                            >
                              {dropItem.titulo}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-1 text-gray-600 font-inter">
                              {dropItem.descricao}
                            </p>
                          </div>
                        </div>) : (<></>)
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              ) : (<></>)
            ) : (
              item.cargos.includes(usuario.cargo) ? (<Link
                to={item.path}
                className="text-sm font-semibold leading-6 text-gray-900 font-inter"
              >
                {item.titulo}
              </Link>) : (<></>)
            )
          )}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative flex">
            <Popover.Button className="flex flex-col gap-x-1 text-sm font-semibold leading-6 text-gray-900 font-inter">
              <p className="font-lato text-xs font-semibold text-gray-800">
                {usuario.nome}
              </p>
              <p className="font-inter text-xs text-gray-500 text">{usuario.cargo}</p>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 w-52">
                <div className="px-4 py-6">
                  <Link to="/configuracoes" className="flex items-center gap-2">
                    <Cog8ToothIcon className="h-4 w-4 stroke-1" />
                    <p className="font-inter text-gray-700 text-sm">Configurações</p>
                  </Link>

                  <button className="flex items-center gap-2 mt-5" onClick={handleLogout}>
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 stroke-1"/>
                    <p className="font-inter text-sm text-gray-700">Sair</p>
                  </button>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Uno</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navitems.map((item) =>
                  item.dropdown ? (
                    item.cargos.includes(usuario.cargo) ? (
                      <Disclosure key={item.id} as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            {item.titulo}
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {item.dropdown.map((dropItem) => (
                              <Disclosure.Button
                                className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                key={dropItem.id}
                              >
                                <Link to={dropItem.path}>{dropItem.titulo}</Link>
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    ) : (<></>)
                    
                  ) : (
                    <Link
                      to={item.path}
                      key={item.id}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.titulo}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}