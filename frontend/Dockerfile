FROM node:24-bookworm

RUN groupadd --gid 1000 vscode || true \
    && useradd --uid 1000 --gid 1000 -m vscode || true \
    && apt-get update \
    && apt-get install -y sudo \
    && echo vscode ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/vscode \
    && chmod 0440 /etc/sudoers.d/vscode

WORKDIR /usr/src/app

COPY . .

# RUN chown vscode:vscode /usr/src/app

