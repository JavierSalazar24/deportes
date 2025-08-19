import { useState } from 'react'

import step1_pc from '../assets/imgs/pwa-pc/step1.png'
import step2_pc from '../assets/imgs/pwa-pc/step2.png'
import step3_pc from '../assets/imgs/pwa-pc/step3.png'
import step4_pc from '../assets/imgs/pwa-pc/step4.png'

import step1_movil from '../assets/imgs/pwa-movil/step1.png'
import step2_movil from '../assets/imgs/pwa-movil/step2.png'
import step3_movil from '../assets/imgs/pwa-movil/step3.png'
import step4_movil from '../assets/imgs/pwa-movil/step4.png'
import step5_movil from '../assets/imgs/pwa-movil/step5.png'
import step6_movil from '../assets/imgs/pwa-movil/step6.png'

export const usePWATutorial = () => {
  const [activeDevice, setActiveDevice] = useState('mobile')
  const [currentStep, setCurrentStep] = useState(0)

  const mobileSteps = [
    {
      title: 'Abre tu navegador y haz clic en los tres puntos (⋮)',
      description:
        'Abre Chrome, Safari o tu navegador preferido en tu dispositivo móvil y haz clic en los tres puntos (⋮) de la esquina superior derecha como se muestra acontinuación.',
      image: step1_movil
    },
    {
      title: "Selecciona la opción 'Agregar a la pantalla...'",
      description:
        'En el submenú que se abrió, haz clic en la opción señalada.',
      image: step2_movil
    },
    {
      title: 'Instala la aplicación',
      description:
        "Da clic en 'Instalar' en el la ventana que se abrió (dependiendo el dispositivo, este paso puede no venir).",
      image: step3_movil
    },
    {
      title: 'Confirma la instalación',
      description: "Toca 'Agregar' o 'Instalar' en el diálogo de confirmación.",
      image: step4_movil
    },
    {
      title: '¡Listo!',
      description:
        'La aplicación aparecerá en tu pantalla de inicio como una app nativa.',
      image: step5_movil
    },
    {
      title: '¡Disfruta la aplicación!',
      description:
        'Ya puedes usar la aplicación como una aplicación nativa del dispositivo.',
      image: step6_movil
    }
  ]

  const desktopSteps = [
    {
      title: 'Busca el ícono de instalación',
      description:
        'Busca en la barra de direcciones un ícono de instalación o descarga y haz clic en él.',
      image: step1_pc
    },
    {
      title: 'Confirma la instalación',
      description:
        "En el diálogo que aparece, haz clic en 'Instalar' para confirmar.",
      image: step2_pc
    },
    {
      title: '¡Aplicación instalada!',
      description:
        'La aplicación se abrirá en una ventana independiente y aparecerá en tu menú de aplicaciones.',
      image: step3_pc
    },
    {
      title: '¡Disfruta la aplicación!',
      description:
        'Ya abierta la aplicación, puedes usarla como una aplicación de escritorio.',
      image: step4_pc
    }
  ]

  const currentSteps = activeDevice === 'mobile' ? mobileSteps : desktopSteps
  const totalSteps = currentSteps.length

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  const switchDevice = (device) => {
    setActiveDevice(device)
    setCurrentStep(0)
  }

  return {
    activeDevice,
    currentSteps,
    totalSteps,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    switchDevice
  }
}
