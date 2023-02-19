import { readFileSync } from 'fs';
import { join } from 'path';
import { getLogger } from '../configs';

const log = getLogger('CertUtils');

export const getPrivateKey = () => {
  try {
    const data = readFileSync(join(__dirname, '..', '..', 'certs', 'private.key'));
    return data;
  } catch (error) {
    log.error('Failed to read private key', error);
    return '';
  }
}

export const getKafkaCert = () => {
  try {
    const data = readFileSync(join(__dirname, '..', '..', 'certs', 'kafka.crt'));
    return data;
  } catch (error) {
    log.error('Failed to read private key', error);
    return '';
  }
}