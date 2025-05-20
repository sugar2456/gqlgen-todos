FROM golang:1.24.2-bookworm

# 非rootユーザーを作成
RUN groupadd --gid 1000 vscode \
    && useradd --uid 1000 --gid 1000 -m vscode \
    && apt-get update \
    && apt-get install -y sudo \
    && echo vscode ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/vscode \
    && chmod 0440 /etc/sudoers.d/vscode

WORKDIR /usr/src/app

COPY . .

RUN chown vscode:vscode /usr/src/app