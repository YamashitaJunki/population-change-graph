FROM alpine:3.15

ENV LANG ja_JP.utf8

ENV PATH $PATH:/usr/bin

WORKDIR /var/workspace

RUN set -x && apk --update --no-cache add bash curl git nodejs \
      && touch ~/.bashrc \
      && curl -o- -L https://yarnpkg.com/install.sh | bash \
      && ln -s "$HOME/.yarn/bin/yarn" /usr/local/bin/yarn

EXPOSE 3000

ENTRYPOINT tail -f /dev/null