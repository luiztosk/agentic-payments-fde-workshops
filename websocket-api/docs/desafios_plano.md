# rascunho rápido dos passos pros desafios

## desafio 1: lista usuarios

### evento servidor -> cliente:

1. definir tipo em protocol.ts
```
export type PresenceEvent = {
  type: "presence";
  usernames: string[];
};
```
2. adicionar metodo que retorna a lista de usernames em ConnectionRegistry
  > usernames duplicados são concatenados com o começo do UUID

3. emitir o evento no join e no close no createChatServer em socket-server.ts
```
if message.type === join
...
registry.broadcast({type: "presence", usernames: })
```

### no cliente:

1. adicionar onlineUsers em web/src/useChatSocket.ts (useState, event handler, return)

2. adicionar contador de usuarios online no App.tsx

3. adicionar lista de usuarios na lateral

### um problema novo:

usuarios com o mesmo nome aparecem corretamente na lista, porém os bubbles se confundem pq é apenas verificado o nome. Então é melhor fazer a comparação via id.
- resolvido enviando de volta para cada cliente seu próprio ID


## desafio 2: status "digitando..."

### evento cliente -> servidor

1. detectar atividade no input
2. enviar somente 1 a cada 2 segundos
3. exemplo `{ type: "typing" }` deve ser suficiente

### evento servidor -> cliente

1. receber `{ type: "typing" }`
2. transmitir imediatamente (confiar no debounce do cliente)
3. exemplo s->c : `{ type: "typing", username: "typer_username" }`

### display no cliente

1. receber evento: `{ type: "typing", username: "typer_username" }`
2. usar um timeout de 3 segundos
3. novo recebido reseta o timer