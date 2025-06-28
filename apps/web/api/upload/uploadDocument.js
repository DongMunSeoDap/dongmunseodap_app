import { gql } from 'urql';

export const UPLOAD_DOCUMENT = gql`
  mutation UploadDocument($file: Upload!, $meta: DocumentMetaInput!, $context: EventContextInput!) {
    uploadDocument(file: $file, meta: $meta, context: $context) {
      documentId
      status
      message
      s3Path
    }
  }
`;
