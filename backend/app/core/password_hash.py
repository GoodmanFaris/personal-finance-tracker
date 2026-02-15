import bcrypt


def password_hash(password: str) -> str:
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(password: str, password_hash_value: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), password_hash_value.encode('utf-8'))