for i in {1..100}
do
  LEVEL=$(shuf -n1 ./levels)
  SYSTEM=$(shuf -n1 ./systems)
  ./emit-log.js "${SYSTEM}.${LEVEL}" "a $SYSTEM $LEVEL"
done
