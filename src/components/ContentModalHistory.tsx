import { Actionsheet, Heading, VStack, useDisclose } from 'native-base'
import { Button } from './Button'
import { useModal } from '@contexts/ModalContext'

export function ContentModalHistory() {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal()

  function handleCloseModal() {
    closeModal()
  }

  return (
    <Actionsheet isOpen={isModalOpen} onClose={closeModal}>
      <Actionsheet.Content>
        <VStack>
          <Heading color={'white'}>Iae historico</Heading>
          <Button title='Close Modal' onPress={handleCloseModal} />
          {/* <Button title='fechar modal' onPress={handleCloseModal} /> */}
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
