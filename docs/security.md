# Security notes

## Password policy (signup)
- Minimum 8 characters, maximum 128.
- No forced composition rules (no required symbols, digits, or case mix).
- A short minimum is compensated in Phase 4 by breached-password screening
  and strict rate limiting.
- Pasting and password managers are allowed.
- Passwords are never trimmed or altered.
- The same schema is reused on the server in Phase 4.

## Terms and Privacy
- Pages at /terms and /privacy are draft placeholders, not in force.
- Phase 4: the server records the accepted document versions and a timestamp.
  The client never supplies either.

## Status
Authentication is not implemented. The login and signup forms validate input
but do not create accounts or sessions.
