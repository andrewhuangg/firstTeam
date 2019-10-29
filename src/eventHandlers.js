export const handleScatterStat = (selection, props) => {
  const { 
    options,
    onOptionClicked,
    selectedOption
   } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
   .on('change', function() { //using function to preserve the keyword this
     onOptionClicked(this.value);
   });

  const option = select.selectAll('option').data(options);
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};

export const handleScatterYear = (selection, props) => {
  const {
    options,
    onOptionClicked,
    selectedOption
  } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
    .on('change', function () {
      onOptionClicked(this.value);
    });

  const option = select.selectAll('option').data(options)
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};

export const handleScatterPos = (selection, props) => {
  const {
    options,
    onOptionClicked,
    selectedOption
  } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
    .on('change', function () {
      onOptionClicked(this.value)
    });

  const option = select.selectAll('option').data(options)
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};

export const handleBarStat = (selection, props) => {
  const {
    options,
    onOptionClicked,
    selectedOption
  } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
    .on('change', function () { //using function to preserve the keyword this
      onOptionClicked(this.value);
    });

  const option = select.selectAll('option').data(options);
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};
