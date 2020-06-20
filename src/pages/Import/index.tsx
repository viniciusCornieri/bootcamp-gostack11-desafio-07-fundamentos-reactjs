import React, { useState } from 'react';

import fileSize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  async function handleUpload(): Promise<void> {
    const uploadPromises = uploadedFiles.map(async fileProps => {
      const data = new FormData();

      data.append('file', fileProps.file);

      try {
        await api.post('/transactions/import', data);
      } catch (err) {
        console.log(err.response.error);
      }
    });

    await Promise.all(uploadPromises);

    setUploadedFiles([]);
  }

  function submitFile(files: File[]): void {
    const filesProps = files.map(file => ({
      file,
      name: file.name,
      readableSize: fileSize(file.size),
    }));
    setUploadedFiles([...uploadedFiles, ...filesProps]);
  }

  return (
    <>
      <Header size="small" activeMenu="Import" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
