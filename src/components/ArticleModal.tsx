import { Modal } from 'antd';
import { useMapStore } from '../pages/map/store';

export function ArticleModal() {
  const [
    {
      isModalVisible,
      currentArticle: { title, url },
    },
    { setModalVisible },
  ] = useMapStore();

  function handleCancel() {
    setModalVisible(false);
  }

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      footer={null}
      onCancel={handleCancel}
      width="80vw"
      bodyStyle={{ height: '80vh' }}
    >
      <iframe
        src={url.replace('wikipedia.org', 'm.wikipedia.org')}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </Modal>
  );
}
