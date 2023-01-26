import { Modal } from '@mantine/core';

function ReportPostModal({reportPostModalOpen,setReportPostModalOpen}) {
  return (
    <Modal 
    opened={reportPostModalOpen}
    centered={true}
    withCloseButton={false}
    onClose={() => setReportPostModalOpen(false)}
    >
      Modal without header, press escape or click on overlay to close
    </Modal>
  );
}

export default ReportPostModal;