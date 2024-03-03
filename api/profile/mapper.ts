import { mapAuthorFromServer } from '../authors/mapper';
import { ProfileObj, ServerProfileObj } from './dataTypes';

export const mapProfileFromServer = (
  serverProfileObj: ServerProfileObj
): ProfileObj => {
  return mapAuthorFromServer(serverProfileObj);
};
