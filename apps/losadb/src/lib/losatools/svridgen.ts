/**
 * Converts an IP address and port number to a 64-bit game server ID, following
 * the convention used by the game. The IP address is stored in the first 32 bits
 * of the ID, and the port number is stored in the last 32 bits.
 *
 * @param ip - The IP address to be converted, in string form.
 * @param port - The port number to be converted, in number form.
 * @returns The game server ID as a bigint.
 */
export function ConvertToGameServerID(ip: string, port: number): bigint {
  const int64Size = 8;
  const intSize = 4;

  const szByteArray = new Uint8Array(8);
  const ipSegments = ip.split(".");

  for (let i = 0; i < ipSegments.length && i < int64Size; i++) {
    szByteArray[i] = parseInt(ipSegments[i]!, 10);
  }

  const portBuffer = new ArrayBuffer(intSize);
  const portView = new DataView(portBuffer);
  portView.setInt32(0, port, true);

  const combinedBuffer = new ArrayBuffer(int64Size);
  const combinedView = new DataView(combinedBuffer);

  for (let i = 0; i < intSize; i++) {
    combinedView.setUint8(i, szByteArray[i]!);
  }

  for (let i = 0; i < intSize; i++) {
    combinedView.setUint8(intSize + i, portView.getUint8(i));
  }

  const gameServerID = combinedView.getBigInt64(0, true);

  return gameServerID;
}

/**
 * Converts a 64-bit game server ID back into an IP address and port number.
 *
 * The first 32 bits of the game server ID represent the IP address, and the
 * last 32 bits represent the port number. This function extracts these values
 * and returns them in a structured format.
 *
 * @param gameServerID - The 64-bit game server ID to be converted.
 * @returns An object containing the IP address as a string and the port number
 *          as a number.
 */
export function ConvertServerIDToAddress(gameServerID: bigint): {
  ip: string;
  port: number;
} {
  const int64Size = 8;
  const intSize = 4;

  const gameServerBuffer = new ArrayBuffer(int64Size);
  const gameServerView = new DataView(gameServerBuffer);
  gameServerView.setBigInt64(0, gameServerID, true);

  const ipSegments = [];
  for (let i = 0; i < intSize; i++) {
    ipSegments.push(gameServerView.getUint8(i).toString());
  }
  const ipAddress = ipSegments.join(".");

  const portBuffer = new ArrayBuffer(intSize);
  const portView = new DataView(portBuffer);
  for (let i = 0; i < intSize; i++) {
    portView.setUint8(i, gameServerView.getUint8(intSize + i));
  }
  const port = portView.getInt32(0, true);

  return { ip: ipAddress, port: port };
}
