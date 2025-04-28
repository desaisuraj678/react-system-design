
Clone google docs

Functional Requirements:
  - Multiple users should be able to edit the doc
  - Offline support
  - View Version history support

Non functional Requirements:
 - Adaptibility
      Mobile,tablet
 - Accessibility
 - Localization
 - Performance
 - Security
 - Caching
 - Resource optimization
 - Architecture
    Monolithic vs Microfrontend vs Monorepo


Differnet solutions
1. Locking
2. Operational transformation :: Officially used by google doc
3. Differential Synchronization


Operational Transaformation:

  T(received Operation, local Operation)


Client server Interaction
 - Web sockets :: Should use this one 
 - server sent events
 - Polling (short / Long)


Version history:
- Store all versions of documents  :: not efficient
- Markle tree :: Efficient